<script setup lang="ts">
import { inject } from 'vue'

import { TABS_CONTEXT_KEY } from './context'

const context = inject(TABS_CONTEXT_KEY)

if (!context) {
	throw new Error(
		'[Tabs] TabList must be used inside <Tabs>.',
	)
}
</script>

<template>
	<div
		role="tablist"
		:aria-orientation="
			context.orientation.value
		"
		:class="[
			'flex',
			context.orientation.value ===
				'horizontal'
				? 'flex-row'
				: 'flex-col',
		]"
	>
		<slot />
	</div>
</template>
