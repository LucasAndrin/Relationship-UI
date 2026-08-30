<script setup lang="ts">
import {
	computed,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from 'vue'

import { cn } from '@/shared/utils'

import { useFocusTrap } from '../primitives/focus-trap/useFocusTrap.js'
import Overlay from '../primitives/overlay/Overlay.vue'
import Portal from '../primitives/portal/Portal.vue'

import { modalVariants } from './modal.variants'

import type { ModalProps } from './types'
import { useScrollLock } from '../primitives/scroll-lock/useScrollLock.js'

const props = withDefaults(
	defineProps<ModalProps>(),
	{
		modelValue: false,
		size: 'md',
		closeOnOverlay: true,
		closeOnEscape: true,
		locked: false,
		scrollLocked: true,
	},
)

const emit = defineEmits<{
	'update:modelValue': [
		value: boolean,
	]

	open: []

	close: []
}>()

const classes = computed(() =>
	cn(
		modalVariants.compose(props),
		props.class,
	),
)

const content = ref<HTMLElement | null>(null)

const isOpen = computed(
	() => props.modelValue,
)

useFocusTrap(
	content,
	{
		active: isOpen,
		restoreFocus: true,
		initialFocus: 'first',
	},
)

useScrollLock({
	active: computed(() => isOpen.value && props.scrollLocked),
})

function close() {
	if (props.locked) {
		return
	}

	emit('update:modelValue', false)
	emit('close')
}

function handleOverlayClick() {
	if (!props.closeOnOverlay) {
		return
	}

	close()
}

function handleKeydown(
	event: KeyboardEvent,
) {
	if (event.key !== 'Escape') {
		return
	}

	if (!props.closeOnEscape) {
		return
	}

	close()
}

watch(
	() => props.modelValue,
	(value, previousValue) => {
		if (value && !previousValue) {
			emit('open')
		}
	},
)

onMounted(() => {
	window.addEventListener(
		'keydown',
		handleKeydown,
	)
})

onBeforeUnmount(() => {
	window.removeEventListener(
		'keydown',
		handleKeydown,
	)
})
</script>

<template>
	<Portal>
		<div
			v-if="modelValue"
			class="fixed inset-0 z-50 flex items-center justify-center p-4"
		>
			<Overlay
				:close-on-click="
					!locked
					&& closeOnOverlay
				"
				@click="handleOverlayClick"
			/>

			<div
				ref="content"
				:class="classes"
				role="dialog"
				aria-modal="true"
				tabindex="-1"
			>
				<slot />
			</div>
		</div>
	</Portal>
</template>
