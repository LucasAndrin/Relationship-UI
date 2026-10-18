
import { createVariants } from '@/shared/utils'

export const dataTableVariants = createVariants({
  base: [
    'w-full',
    'overflow-x-auto',
    'border',
    'bg-white',
    'text-slate-900',
    'dark:bg-slate-950',
    'dark:text-slate-100',
  ],

  variants: {
    variant: {
      default: [
        'border-slate-200',
        'dark:border-slate-800',
      ],

      striped: [
        'border-slate-200',
        'dark:border-slate-800',
      ],

      bordered: [
        'border-slate-300',
        'dark:border-slate-700',
      ],

      minimal: [
        'border-transparent',
        'bg-transparent',
        'dark:bg-transparent',
      ],
    },

    size: {
      sm: [
        '[&_th]:px-2',
        '[&_th]:py-1.5',
        '[&_td]:px-2',
        '[&_td]:py-1.5',
        'text-xs',
      ],

      md: [
        '[&_th]:px-4',
        '[&_th]:py-3',
        '[&_td]:px-4',
        '[&_td]:py-3',
        'text-sm',
      ],

      lg: [
        '[&_th]:px-5',
        '[&_th]:py-4',
        '[&_td]:px-5',
        '[&_td]:py-4',
        'text-base',
      ],
    },

    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'md',
    rounded: 'md',
  },
})
