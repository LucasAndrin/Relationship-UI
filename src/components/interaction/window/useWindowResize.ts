import type { WindowPosition, WindowSize } from '@/src/core/window-manager'
import { onBeforeUnmount, ref } from 'vue'
import type { WindowBounds } from './types'

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

type UseWindowResizeOptions = {
    position: () => WindowPosition
    size: () => WindowSize
    bounds: () => WindowBounds

    minSize?: WindowSize

    onResize: (size: WindowSize, position: WindowPosition) => void
}

export function useWindowResize(options: UseWindowResizeOptions) {
    const resizing = ref(false)

    let direction: ResizeDirection | null = null

    let startMouseX = 0
    let startMouseY = 0

    let startWindowX = 0
    let startWindowY = 0

    let startWidth = 0
    let startHeight = 0

    function start(
        event: MouseEvent,
        resizeDirection: ResizeDirection,
    ) {
        if (event.button !== 0) return

        const position = options.position()
        const size = options.size()

        direction = resizeDirection

        startMouseX = event.clientX
        startMouseY = event.clientY

        startWindowX = position.x
        startWindowY = position.y

        startWidth = size.width
        startHeight = size.height

        resizing.value = true

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', stop)
    }

    function handleMove(event: MouseEvent) {
        if (!resizing.value || !direction) return

        const deltaX = event.clientX - startMouseX
        const deltaY = event.clientY - startMouseY

        const bounds = options.bounds()

        const minWidth = options.minSize?.width ?? 200
        const minHeight = options.minSize?.height ?? 120

        let x = startWindowX
        let y = startWindowY

        let width = startWidth
        let height = startHeight

        /*
         * EAST
         */
        if (direction.includes('e')) {
            width = Math.max(minWidth, startWidth + deltaX)
            width = Math.min(width, bounds.width - startWindowX)
        }

        /*
         * SOUTH
         */
        if (direction.includes('s')) {
            height = Math.max(minHeight, startHeight + deltaY)
            height = Math.min(height, bounds.height - startWindowY)
        }

        /*
         * WEST
         */
        if (direction.includes('w')) {
            const maxDelta = startWindowX
            const actualDelta = Math.min(deltaX, maxDelta)

            x = startWindowX + actualDelta
            width = startWidth - actualDelta

            if (width < minWidth) {
                width = minWidth
                x = startWindowX + startWidth - minWidth
            }
        }

        /*
         * NORTH
         */
		if (direction.includes('n')) {
			const minDelta = -startWindowY
			const maxDelta = startHeight - minHeight

			const actualDelta = Math.max(minDelta, Math.min(deltaY, maxDelta))

			y = startWindowY + actualDelta
			height = startHeight - actualDelta
		}

		x = Math.max(0, x)
		y = Math.max(0, y)

        width = Math.min(width, bounds.width - x)
        height = Math.min(height, bounds.height - y)

        options.onResize({ width, height }, { x, y })
    }

    function stop() {
        if (!resizing.value) return
        resizing.value = false
        direction = null
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', stop)
    }

    onBeforeUnmount(stop)

    return {
        resizing,
        start,
    }
}
