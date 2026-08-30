import { createVariants } from '@/shared/utils'

export const overlayVariants = createVariants({
	base: [
		'fixed',
		'inset-0',
		'z-40',
		'bg-black',
	],

	variants: {
		opacity: {
			light: 'bg-opacity-25',

			medium: 'bg-opacity-50',

			dark: 'bg-opacity-75',
		},

		blur: {
			none: '',

			sm: 'backdrop-blur-sm',

			md: 'backdrop-blur-md',

			lg: 'backdrop-blur-lg',
		},
	},

	defaultVariants: {
		opacity: 'medium',

		blur: 'none',
	},
})
