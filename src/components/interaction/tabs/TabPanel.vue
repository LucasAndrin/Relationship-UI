<script setup lang="ts">
import { computed, inject } from 'vue'

import { TABS_CONTEXT_KEY } from './context'

import type { TabPanelProps } from './types'

const props = defineProps<TabPanelProps>()

const context = inject(TABS_CONTEXT_KEY)

if (!context) {
	throw new Error(
		'[Tabs] TabPanel must be used inside <Tabs>.',
	)
}

const active = computed(() => context.isActive(props.value))
</script>

<template>
	<div v-if="active" role="tabpanel" :class="props.class" tabindex="0">
		<slot />
	</div>
</template>
