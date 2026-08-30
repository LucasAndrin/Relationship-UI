<script setup lang="ts">
import {
	computed,
	provide,
	ref,
	watch,
} from 'vue'

import {
	TABS_CONTEXT_KEY,
} from './context'

import type {
	TabsOrientation,
	TabsProps,
} from './types'

const props = withDefaults(
	defineProps<TabsProps>(),
	{
		orientation: 'horizontal',
	},
)

const emit = defineEmits<{
	'update:modelValue': [
		value: string,
	]
}>()

const internalValue =
	ref<string | undefined>(
		props.modelValue
		?? props.defaultValue,
	)

type RegisteredTab = {
	element: HTMLElement
	disabled: boolean
}

const tabs = new Map<
	string,
	RegisteredTab
>()

const activeValue = computed(
	() =>
		props.modelValue
		?? internalValue.value,
)

const orientation = computed<TabsOrientation>(
	() => props.orientation,
)

function registerTab(
	value: string,
	element: HTMLElement,
	disabled: boolean,
) {
	tabs.set(value, {
		element,
		disabled,
	})
}

function unregisterTab(
	value: string,
) {
	tabs.delete(value)
}

function isDisabled(
	value: string,
) {
	return tabs.get(value)?.disabled ?? false
}

function selectTab(
	value: string,
) {
	if (isDisabled(value)) {
		return
	}

	internalValue.value = value

	emit(
		'update:modelValue',
		value,
	)
}

function isActive(
	value: string,
) {
	return activeValue.value === value
}

function getEnabledTabs() {
	return Array.from(tabs.entries())
		.filter(
			([, tab]) =>
				!tab.disabled,
		)
}

function focusTab(
	value: string,
) {
	const tab = tabs.get(value)

	if (!tab || tab.disabled) {
		return
	}

	tab.element.focus()
}

function focusNext(currentValue: string) {
	const enabledTabs = getEnabledTabs()
	if (enabledTabs.length === 0) {
		return
	}
	const currentIndex = enabledTabs.findIndex(([value]) => value === currentValue)
	const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % enabledTabs.length
	activateTab(enabledTabs[nextIndex][0])
}

function focusPrevious(currentValue: string) {
	const enabledTabs = getEnabledTabs()
	if (enabledTabs.length === 0) {
		return
	}
	const currentIndex = enabledTabs.findIndex(([value]) => value === currentValue)
	const previousIndex = currentIndex === -1 ? enabledTabs.length - 1 : (currentIndex - 1 + enabledTabs.length) % enabledTabs.length
	activateTab(enabledTabs[previousIndex][0])
}

function focusFirst() {
	const first = getEnabledTabs()[0]
	if (!first) {
		return
	}
	activateTab(first[0])
}

function focusLast() {
	const enabledTabs = getEnabledTabs()
	const last = enabledTabs[enabledTabs.length - 1]
	if (!last) {
		return
	}
	activateTab(last[0])
}

function activateTab(value: string) {
	if (isDisabled(value)) {
		return
	}

	const tab = tabs.get(value)

	if (!tab) {
		return
	}

	tab.element.focus()

	selectTab(value)
}

watch(
	() => props.modelValue,
	value => {
		if (value !== undefined) {
			internalValue.value = value
		}
	},
)

provide(
	TABS_CONTEXT_KEY,
	{
		activeValue,
		orientation,

		registerTab,
		unregisterTab,

		selectTab,

		isActive,
		isDisabled,

		focusTab,
		focusNext,
		focusPrevious,
		focusFirst,
		focusLast,
	},
)
</script>

<template>
	<div
		:class="[
			'relative',
			props.class,
		]"
	>
		<slot />
	</div>
</template>
