export type CardVariant =
	| 'default'
	| 'outlined'
	| 'ghost'

export type CardProps = {
	variant?: CardVariant

	class?: string
}
