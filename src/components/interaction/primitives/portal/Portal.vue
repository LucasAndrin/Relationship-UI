<script setup lang="ts">
import { computed } from 'vue'

type PortalProps = {
	to?: string | HTMLElement
	disabled?: boolean
}

const props = withDefaults(
	defineProps<PortalProps>(),
	{
		to: 'body',
		disabled: false,
	},
)

const target = computed(() => props.to)
</script>

<template>
	<Teleport
		:to="target"
		:disabled="disabled"
	>
		<slot />
	</Teleport>
</template>
