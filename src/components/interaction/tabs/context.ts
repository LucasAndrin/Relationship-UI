import type { InjectionKey, Ref } from 'vue'

export type TabsOrientation =
	| 'horizontal'
	| 'vertical'

export type TabsContext = {
	activeValue: Ref<string | undefined>

	orientation: Ref<TabsOrientation>

	registerTab: (
		value: string,
		element: HTMLElement,
		disabled: boolean,
	) => void

	unregisterTab: (
		value: string,
	) => void

	selectTab: (
		value: string,
	) => void

	isActive: (
		value: string,
	) => boolean

	isDisabled: (
		value: string,
	) => boolean

	focusTab: (
		value: string,
	) => void

	focusNext: (
		currentValue: string,
	) => void

	focusPrevious: (
		currentValue: string,
	) => void

	focusFirst: () => void

	focusLast: () => void
}

export const TABS_CONTEXT_KEY:
	InjectionKey<TabsContext> =
	Symbol('tabs')
