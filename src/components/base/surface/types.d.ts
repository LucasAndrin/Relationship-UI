import type { surfaceVariants } from './surface.variants';
import type { VariantProps } from '@/shared/utils'
import { surfaceVariants } from './surface.variants'

export type SurfaceVariant =
    | 'filled'
    | 'outlined'
    | 'ghost'

export type SurfaceRounded =
    | 'none'
    | 'sm'
    | 'md'
    | 'lg'
    | 'full'

export type SurfaceShadow =
    | 'none'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'

export type SurfaceElement =
    | string
    | Component

export interface SurfaceProps extends VariantProps<typeof surfaceVariants> {
    as?: SurfaceElement
    class?: string
}
