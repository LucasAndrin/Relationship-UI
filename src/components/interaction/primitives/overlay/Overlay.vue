<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/utils'

import { overlayVariants } from './overlay.variants'

import type { OverlayProps } from './types'

const props = withDefaults(
	defineProps<OverlayProps>(),
	{
		opacity: 'medium',
		blur: 'none',
		closeOnClick: true,
	},
)

const emit = defineEmits<{
	click: [event: MouseEvent]
}>()

const classes = computed(() =>
	cn(
		overlayVariants.compose(props),
		props.class,
	),
)

function handleClick(
	event: MouseEvent,
) {
	if (!props.closeOnClick) {
		return
	}

	emit('click', event)
}
</script>

<template>
	<div
		:class="classes"
		aria-hidden="true"
		@click="handleClick"
	/>
</template>
