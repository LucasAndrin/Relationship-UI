import { createVariants } from '@/shared/utils'

export const surfaceVariants = createVariants({
	base: 'transition-all duration-200',

	variants: {
		variant: {
			filled: 'bg-white',

			outlined: 'border',

			ghost: 'bg-transparent',
		},

		rounded: {
			none: 'rounded-none',

			sm: 'rounded-sm',

			md: 'rounded-md',

			lg: 'rounded-lg',

			full: 'rounded-full',
		},

		shadow: {
			none: '',

			sm: 'shadow-sm',

			md: 'shadow',

			lg: 'shadow-lg',

			xl: 'shadow-xl',
		},
	},

	defaultVariants: {
		variant: 'filled',

		rounded: 'md',

		shadow: 'sm',
	},
})
