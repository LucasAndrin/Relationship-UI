export type AvatarSize =
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'

export type AvatarProps = {
	src?: string

	alt?: string

	fallback?: string

	size?: AvatarSize

	class?: string
}
