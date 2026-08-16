import { createVariants } from '@/shared/utils'

export const dividerVariants = createVariants({
	base: 'shrink-0 bg-slate-200',

	variants: {
		orientation: {
			horizontal: 'h-px w-full',

			vertical: 'h-full w-px',
		},
	},

	defaultVariants: {
		orientation: 'horizontal',
	},
})
