<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/utils'

import { buttonVariants } from './button.variants'

import type { ButtonProps } from './types'

defineOptions({
	inheritAttrs: false,
})

const props = withDefaults(
	defineProps<ButtonProps>(),
	{
		as: 'button',
		type: 'button',
		disabled: false,
		loading: false,
	},
)

const classes = computed(() =>
	cn(
		buttonVariants.compose(props),

		props.loading && 'cursor-wait',

		props.class,
	),
)
</script>

<template>
	<component
		:is="as"
		v-bind="$attrs"

		:type="
			as === 'button'
				? type
				: undefined
		"

		:disabled="
			as === 'button'
				? disabled || loading
				: undefined
		"

		:aria-disabled="
			disabled || loading
		"

		:aria-busy="loading"

		:class="classes"
	>
		<span
			v-if="loading"
			class="inline-flex"
			aria-hidden="true"
		>
			<svg
				class="size-4 animate-spin"
				viewBox="0 0 24 24"
				fill="none"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>

				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
				/>
			</svg>
		</span>

		<slot />
	</component>
</template>
