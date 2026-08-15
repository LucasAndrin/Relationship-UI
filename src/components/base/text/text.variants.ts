import { createVariants } from '@/shared/utils'

export const textVariants = createVariants({
	base: 'm-0',

	variants: {
		variant: {
			body: 'text-base',
			title: 'text-2xl font-semibold',
			subtitle: 'text-lg font-medium',
			caption: 'text-sm',
			label: 'text-sm font-medium',
			overline: 'text-xs font-semibold uppercase tracking-wide',
		},

		weight: {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		},

		color: {
			default: 'text-gray-900',
			muted: 'text-gray-500',
			primary: 'text-blue-600',
			danger: 'text-red-600',
			success: 'text-green-600',
		},

		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
			justify: 'text-justify',
		},
	},

	defaultVariants: {
		variant: 'body',
		weight: 'normal',
		color: 'default',
		align: 'left',
	},
})
