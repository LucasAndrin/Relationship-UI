export type TabsOrientation =
	| 'horizontal'
	| 'vertical'

export type TabsProps = {
	modelValue?: string

	defaultValue?: string

	orientation?: TabsOrientation

	class?: string
}

export type TabProps = {
	value: string

	disabled?: boolean

	class?: string
}

export type TabPanelProps = {
	value: string

	class?: string
}
