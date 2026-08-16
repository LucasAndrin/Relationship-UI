import { createVariants } from '@/shared/utils'

export const cardVariants = createVariants({
	base: [
		'rounded-lg',
		'p-6',
	],

	variants: {
		variant: {
			default: [
				'bg-white',
				'shadow-sm',
			],

			outlined: [
				'border',
				'border-slate-200',
				'bg-white',
			],

			ghost: [
				'bg-transparent',
			],
		},
	},

	defaultVariants: {
		variant: 'default',
	},
})
