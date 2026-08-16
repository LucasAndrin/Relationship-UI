<script setup lang="ts">
import { computed, ref } from 'vue'

import { cn } from '@/shared/utils'

import { avatarVariants } from './avatar.variants'

import type { AvatarProps } from './types'

const props = withDefaults(
	defineProps<AvatarProps>(),
	{
		size: 'md',
	},
)

const imageError = ref(false)

const classes = computed(() =>
	cn(
		avatarVariants.compose(props),
		props.class,
	),
)

const showImage = computed(
	() => props.src && !imageError.value,
)

function handleImageError() {
	imageError.value = true
}
</script>

<template>
	<div :class="classes">
		<img
			v-if="showImage"
			:src="src"
			:alt="alt"
			class="size-full object-cover"
			@error="handleImageError"
		/>

		<span
			v-else
			aria-hidden="true"
		>
			{{ fallback }}
		</span>
	</div>
</template>
