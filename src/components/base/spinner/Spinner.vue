<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/utils'

import { spinnerVariants } from './spinner.variants'

import type { SpinnerProps } from './types'

const props = withDefaults(
	defineProps<SpinnerProps>(),
	{
		size: 'md',
	},
)

const classes = computed(() =>
	cn(
		spinnerVariants.compose(props),
		props.class,
	),
)
</script>

<template>
	<span
		:class="classes"
		role="status"
		aria-label="Carregando"
	>
		<span class="sr-only">
			Carregando
		</span>
	</span>
</template>
