<script setup lang="ts">
import {
	computed,
	inject,
	onBeforeUnmount,
	onMounted,
	ref,
} from 'vue'

import {
	TABS_CONTEXT_KEY,
} from './context'

import type {
	TabProps,
} from './types'

const props = withDefaults(
	defineProps<TabProps>(),
	{
		disabled: false,
	},
)

const context = inject(
	TABS_CONTEXT_KEY,
)

if (!context) {
	throw new Error(
		'[Tabs] Tab must be used inside <Tabs>.',
	)
}

const element =
	ref<HTMLElement | null>(null)

const active = computed(
	() =>
		context.isActive(
			props.value,
		),
)

function select() {
	if (props.disabled) {
		return
	}

	context.selectTab(
		props.value,
	)
}

function handleKeydown(
	event: KeyboardEvent,
) {
	const isHorizontal =
		context.orientation.value ===
		'horizontal'

	const isVertical =
		context.orientation.value ===
		'vertical'

	switch (event.key) {
		case 'Enter':
		case ' ':
			event.preventDefault()

			select()

			break

		case 'ArrowRight':
			if (!isHorizontal) {
				return
			}

			event.preventDefault()

			context.focusNext(
				props.value,
			)

			break

		case 'ArrowLeft':
			if (!isHorizontal) {
				return
			}

			event.preventDefault()

			context.focusPrevious(
				props.value,
			)

			break

		case 'ArrowDown':
			if (!isVertical) {
				return
			}

			event.preventDefault()

			context.focusNext(
				props.value,
			)

			break

		case 'ArrowUp':
			if (!isVertical) {
				return
			}

			event.preventDefault()

			context.focusPrevious(
				props.value,
			)

			break

		case 'Home':
			event.preventDefault()

			context.focusFirst()

			break

		case 'End':
			event.preventDefault()

			context.focusLast()

			break
	}
}

onMounted(() => {
	if (!element.value) {
		return
	}

	context.registerTab(
		props.value,
		element.value,
		props.disabled,
	)
})

onBeforeUnmount(() => {
	context.unregisterTab(
		props.value,
	)
})
</script>

<template>
	<button
		ref="element"
		type="button"
		role="tab"
		:aria-selected="active"
		:aria-disabled="
			props.disabled || undefined
		"
		:tabindex="
			active && !props.disabled
				? 0
				: -1
		"
		:disabled="props.disabled"
		:class="[
			'px-4 py-2',
			'text-sm font-medium',
			'transition-colors',
			'border-b-2',

			active
				? 'border-current'
				: 'border-transparent',

			props.disabled
				? 'cursor-not-allowed opacity-50'
				: 'cursor-pointer',

			props.class,
		]"
		@click="select"
		@keydown="handleKeydown"
	>
		<slot />
	</button>
</template>
