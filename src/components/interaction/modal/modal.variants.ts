import { createVariants } from '@/shared/utils'

export const modalVariants = createVariants({
	base: [
		'relative',
		'z-50',
		'w-full',
		'rounded-lg',
		'bg-white',
		'shadow-xl',

		'max-h-[calc(100vh-2rem)]',
		'overflow-auto',
	],

	variants: {
		size: {
			sm: 'max-w-sm',
			md: 'max-w-md',
			lg: 'max-w-lg',
			xl: 'max-w-xl',
			full: 'max-w-none',
		},
	},

	defaultVariants: {
		size: 'md',
	},
})
