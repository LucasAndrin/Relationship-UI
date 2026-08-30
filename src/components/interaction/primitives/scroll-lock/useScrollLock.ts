import { onBeforeUnmount, watch, type Ref } from 'vue'

export type ScrollLockOptions = {
	active: Ref<boolean>
}

let lockCount = 0
let originalOverflow: string | null = null
let originalPaddingRight: string | null = null

function lock() {
	if (lockCount === 0) {
		const body = document.body

		originalOverflow = body.style.overflow
		originalPaddingRight = body.style.paddingRight

		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

		body.style.overflow = 'hidden'

		if (scrollbarWidth > 0) {
			body.style.paddingRight = `${scrollbarWidth}px`
		}
	}

	lockCount++
}

function unlock() {
	if (lockCount <= 0) {
		return
	}

	lockCount--

	if (lockCount > 0) {
		return
	}

	const body = document.body

	body.style.overflow = originalOverflow ?? ''

	body.style.paddingRight = originalPaddingRight ?? ''

	originalOverflow = null
	originalPaddingRight = null
}

export function useScrollLock(options: ScrollLockOptions) {
	let locked = false

	function activate() {
		if (locked) {
			return
		}

		lock()

		locked = true
	}

	function deactivate() {
		if (!locked) {
			return
		}

		unlock()

		locked = false
	}

	watch(options.active, (active) => {
			if (active) {
				activate()
			} else {
				deactivate()
			}
		},
		{
			immediate: true,
		},
	)

	onBeforeUnmount(() => {
		deactivate()
	})

	return {
		lock: activate,
		unlock: deactivate,
	}
}
