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

export type SurfaceProps = {
    as?: string
    class?: string
    variant?: SurfaceVariant
    rounded?: SurfaceRounded
    shadow?: SurfaceShadow
}
