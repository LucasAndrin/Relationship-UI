export type OverlayOpacity =
	| 'light'
	| 'medium'
	| 'dark'

export type OverlayBlur =
	| 'none'
	| 'sm'
	| 'md'
	| 'lg'

export type OverlayProps = {
	opacity?: OverlayOpacity

	blur?: OverlayBlur

	closeOnClick?: boolean

	class?: string
}
