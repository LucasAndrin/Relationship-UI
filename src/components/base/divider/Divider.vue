<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/utils'

import { dividerVariants } from './divider.variants'

import type { DividerProps } from './types'

const props = withDefaults(
	defineProps<DividerProps>(),
	{
		orientation: 'horizontal',
	},
)

const classes = computed(() =>
	cn(
		dividerVariants.compose(props),
		props.class,
	)
)
</script>

<template>
	<div
		:class="classes"
		role="separator"
		:aria-orientation="orientation"
	/>
</template>
