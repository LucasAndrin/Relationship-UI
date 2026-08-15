<script setup lang="ts">
import { computed } from 'vue'

import { textVariants } from './text.variants'

import type { TextProps } from './types'

const props = withDefaults(
	defineProps<TextProps>(),
	{
		as: 'span',
	},
)

const classes = computed(() =>
	textVariants.compose(props),
)
</script>

<template>
	<component
		:is="props.as"
		:class="classes"
	>
		<slot />
	</component>
</template>
