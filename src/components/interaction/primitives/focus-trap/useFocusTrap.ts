import {
	nextTick,
	onBeforeUnmount,
	watch,
	type Ref,
} from 'vue'

export type FocusTrapOptions = {
	active: Ref<boolean>

	restoreFocus?: boolean

	initialFocus?: 'first' | 'container'
}

const focusableSelector = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
	'audio[controls]',
	'video[controls]',
	'details > summary',
].join(',')

export function useFocusTrap(
	container: Ref<HTMLElement | null>,
	options: FocusTrapOptions,
) {
	let previouslyFocused:
		HTMLElement | null = null

	function getFocusableElements() {
		if (!container.value) {
			return []
		}

		return Array.from(
			container.value.querySelectorAll<HTMLElement>(
				focusableSelector,
			),
		).filter(
			element =>
				!element.hasAttribute('disabled')
				&& element.getAttribute(
					'aria-hidden',
				) !== 'true'
				&& element.offsetParent !== null,
		)
	}

	function focusInitialElement() {
		if (!container.value) {
			return
		}

		if (
			options.initialFocus ===
			'container'
		) {
			container.value.focus()

			return
		}

		const focusable =
			getFocusableElements()

		if (focusable.length > 0) {
			focusable[0].focus()

			return
		}

		container.value.focus()
	}

	function handleKeydown(
		event: KeyboardEvent,
	) {
		if (!options.active.value) {
			return
		}

		if (event.key !== 'Tab') {
			return
		}

		const focusable =
			getFocusableElements()

		if (focusable.length === 0) {
			event.preventDefault()

			focusInitialElement()

			return
		}

		const first = focusable[0]
		const last =
			focusable[
				focusable.length - 1
			]

		if (
			event.shiftKey
			&& document.activeElement === first
		) {
			event.preventDefault()

			last.focus()

			return
		}

		if (
			!event.shiftKey
			&& document.activeElement === last
		) {
			event.preventDefault()

			first.focus()
		}
	}

	function handleFocusIn(
		event: FocusEvent,
	) {
		if (!options.active.value) {
			return
		}

		if (!container.value) {
			return
		}

		const target = event.target

		if (!(target instanceof Node)) {
			return
		}

		if (
			container.value.contains(target)
		) {
			return
		}

		focusInitialElement()
	}

	function activate() {
		if (!options.active.value) {
			return
		}

		previouslyFocused =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null

		document.addEventListener(
			'keydown',
			handleKeydown,
		)

		document.addEventListener(
			'focusin',
			handleFocusIn,
		)

		nextTick(() => {
			focusInitialElement()
		})
	}

	function deactivate() {
		document.removeEventListener(
			'keydown',
			handleKeydown,
		)

		document.removeEventListener(
			'focusin',
			handleFocusIn,
		)

		if (
			options.restoreFocus !== false
			&& previouslyFocused
			&& document.contains(
				previouslyFocused,
			)
		) {
			previouslyFocused.focus()
		}

		previouslyFocused = null
	}

	watch(
		options.active,
		(active, previous) => {
			if (active && !previous) {
				activate()

				return
			}

			if (!active && previous) {
				deactivate()
			}
		},
	)

	if (options.active.value) {
		activate()
	}

	onBeforeUnmount(() => {
		deactivate()
	})

	return {
		activate,
		deactivate,
		focusInitialElement,
	}
}
