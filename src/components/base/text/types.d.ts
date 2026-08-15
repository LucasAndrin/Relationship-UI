export type TextVariant =
	| 'body'
	| 'title'
	| 'subtitle'
	| 'caption'
	| 'label'
	| 'overline'

export type TextWeight =
	| 'normal'
	| 'medium'
	| 'semibold'
	| 'bold'

export type TextColor =
	| 'default'
	| 'muted'
	| 'primary'
	| 'danger'
	| 'success'

export type TextAlign =
	| 'left'
	| 'center'
	| 'right'
	| 'justify'

export type TextProps = {
	as?: string
    class?: string
	variant?: TextVariant
	weight?: TextWeight
	color?: TextColor
	align?: TextAlign
}
