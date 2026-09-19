import type { WindowPosition, WindowSize } from '@/src/core/window-manager';

export type WindowBounds = {
    width: number
    height: number
}

export type WindowProps = {
    title?: string
    position: WindowPosition
    size: WindowSize
    zIndex: number
    minimized?: boolean
    maximized?: boolean
    draggable?: boolean
    resizable?: boolean
    bounds: WindowBounds
    class?: string
}
