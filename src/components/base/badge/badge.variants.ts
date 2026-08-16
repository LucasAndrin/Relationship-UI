import { createVariants } from '@/shared/utils'

export const badgeVariants = createVariants({
	base: [
		'inline-flex',
		'items-center',
		'justify-center',
		'whitespace-nowrap',
		'font-medium',
		'select-none',
	],

	variants: {
		variant: {
			default: [
				'bg-slate-900',
				'text-white',
			],

			secondary: [
				'bg-slate-100',
				'text-slate-900',
			],

			success: [
				'bg-emerald-100',
				'text-emerald-800',
			],

			warning: [
				'bg-amber-100',
				'text-amber-800',
			],

			danger: [
				'bg-red-100',
				'text-red-800',
			],

			info: [
				'bg-blue-100',
				'text-blue-800',
			],

			outline: [
				'border',
				'border-slate-300',
				'text-slate-700',
			],
		},

		size: {
			sm: [
				'h-5',
				'px-2',
				'text-xs',
				'rounded',
			],

			md: [
				'h-6',
				'px-2.5',
				'text-xs',
				'rounded-md',
			],

			lg: [
				'h-7',
				'px-3',
				'text-sm',
				'rounded-md',
			],
		},
	},

	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
})
