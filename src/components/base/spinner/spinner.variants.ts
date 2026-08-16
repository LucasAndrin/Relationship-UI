import { createVariants } from '@/shared/utils'

export const spinnerVariants = createVariants({
	base: [
		'inline-block',
		'animate-spin',
		'rounded-full',
		'border-2',
		'border-current',
		'border-t-transparent',
	],

	variants: {
		size: {
			sm: 'size-4',
			md: 'size-5',
			lg: 'size-6',
		},
	},

	defaultVariants: {
		size: 'md',
	},
})
