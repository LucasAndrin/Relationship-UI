<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/utils'

import { badgeVariants } from './badge.variants'

import type { BadgeProps } from './types'

const props = withDefaults(
	defineProps<BadgeProps>(),
	{
		variant: 'default',
		size: 'md',
	},
)

const classes = computed(() =>
	cn(
		badgeVariants.compose(props),
		props.class,
	),
)
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
