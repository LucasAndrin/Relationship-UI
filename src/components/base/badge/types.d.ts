export type BadgeVariant =
	| 'default'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'outline'

export type BadgeSize =
	| 'sm'
	| 'md'
	| 'lg'

export type BadgeProps = {
	variant?: BadgeVariant

	size?: BadgeSize

	class?: string
}
