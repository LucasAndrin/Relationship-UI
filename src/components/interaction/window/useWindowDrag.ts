import type { WindowPosition, WindowSize } from '@/src/core/window-manager';
// import { onBeforeUnmount, ref, type Ref } from 'vue'
import { onBeforeUnmount, ref } from 'vue'
import type { WindowBounds } from './types';

// type UseWindowDragOptions = {
// 	container: Ref<HTMLElement | null>
//     position: () => WindowPosition
//     onMove: (position: WindowPosition) => void
// }

type UseWindowDragOptions = {
    position: () => WindowPosition
    size: () => WindowSize
    bounds: () => WindowBounds
    onMove: (position: WindowPosition) => void
}

export function useWindowDrag(options: UseWindowDragOptions) {
    const dragging = ref(false)

    let startMouseX = 0
    let startMouseY = 0

    let startWindowX = 0
    let startWindowY = 0

    function start(event: MouseEvent) {
        if (event.button !== 0) return

        const position = options.position()

        startMouseX = event.clientX
        startMouseY = event.clientY

        startWindowX = position.x
        startWindowY = position.y

        dragging.value = true

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', stop)
    }

    function handleMove(event: MouseEvent) {
        if (!dragging.value) return
        const deltaX = event.clientX - startMouseX
        const deltaY = event.clientY - startMouseY

        const size = options.size()
        const bounds = options.bounds()

        const minX = 0
        const minY = 0

        const maxX = Math.max(0, bounds.width - size.width)
        const maxY = Math.max(0, bounds.height - size.height)

        const x = Math.min(Math.max(startWindowX + deltaX, minX), maxX)
        const y = Math.min(Math.max(startWindowY + deltaY, minY), maxY)

        options.onMove({ x, y })
    }

    function stop() {
        if (!dragging.value) return
        dragging.value = false
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', stop)
    }

    onBeforeUnmount(stop)

    return {
        dragging,
        start,
    }
}
