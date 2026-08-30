export type ModalSize =
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| 'full'

export type ModalProps = {
	modelValue?: boolean

	size?: ModalSize

	closeOnOverlay?: boolean

	closeOnEscape?: boolean

	locked?: boolean

	class?: string
}
