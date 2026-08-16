import { createVariants } from '@/shared/utils'

export const buttonVariants = createVariants({
	base: [
		'inline-flex',
		'items-center',
		'justify-center',
		'gap-2',

		'font-medium',
		'select-none',

		'transition-colors',

		'outline-none',

		'cursor-pointer',

		'focus-visible:ring-2',
		'focus-visible:ring-offset-2',

		'disabled:pointer-events-none',
		'disabled:cursor-not-allowed',
		'disabled:opacity-50',
	],

	variants: {
		variant: {
			filled: [
				'bg-slate-900',
				'text-white',

				'hover:bg-slate-800',
				'active:bg-slate-950',
			],

			outlined: [
				'border',
				'border-slate-300',

				'bg-transparent',
				'text-slate-900',

				'hover:bg-slate-50',
				'active:bg-slate-100',
			],

			ghost: [
				'bg-transparent',
				'text-slate-900',

				'hover:bg-slate-100',
				'active:bg-slate-200',
			],
		},

		size: {
			sm: [
				'h-8',
				'px-3',
				'text-sm',
			],

			md: [
				'h-10',
				'px-4',
				'text-sm',
			],

			lg: [
				'h-12',
				'px-6',
				'text-base',
			],
		},

		rounded: {
			none: 'rounded-none',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			full: 'rounded-full',
		},
	},

	defaultVariants: {
		variant: 'filled',
		size: 'md',
		rounded: 'md',
	},
})
