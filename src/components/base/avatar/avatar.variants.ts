import { createVariants } from '@/shared/utils'

export const avatarVariants = createVariants({
	base: [
		'relative',
		'inline-flex',
		'shrink-0',
		'items-center',
		'justify-center',
		'overflow-hidden',
		'rounded-full',
		'bg-slate-100',
		'text-slate-600',
		'font-medium',
	],

	variants: {
		size: {
			sm: 'size-8 text-xs',
			md: 'size-10 text-sm',
			lg: 'size-12 text-base',
			xl: 'size-16 text-lg',
		},
	},

	defaultVariants: {
		size: 'md',
	},
})
