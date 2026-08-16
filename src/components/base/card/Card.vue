<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/utils'

import { cardVariants } from './card.variants'

import type { CardProps } from './types'

const props = withDefaults(
	defineProps<CardProps>(),
	{
		variant: 'default',
	},
)

const classes = computed(() =>
	cn(
		cardVariants.compose(props),
		props.class,
	),
)
</script>

<template>
	<section :class="classes">
		<div
			v-if="$slots.header"
			class="mb-4"
		>
			<slot name="header" />
		</div>

		<div>
			<slot />
		</div>

		<div
			v-if="$slots.footer"
			class="mt-4"
		>
			<slot name="footer" />
		</div>
	</section>
</template>
