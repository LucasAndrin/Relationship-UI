export type ButtonVariant =
	| 'filled'
	| 'outlined'
	| 'ghost'

export type ButtonSize =
	| 'sm'
	| 'md'
	| 'lg'

export type ButtonRounded =
	| 'none'
	| 'sm'
	| 'md'
	| 'lg'
	| 'full'

export type ButtonProps = {
	as?: string

	class?: string

	variant?: ButtonVariant

	size?: ButtonSize

	rounded?: ButtonRounded

	disabled?: boolean

	loading?: boolean

	type?: 'button' | 'submit' | 'reset'
}
