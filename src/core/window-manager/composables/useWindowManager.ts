import { computed, inject } from 'vue'
import { useWindowManagerStore } from '../store/WindowManagerStore'
import { WINDOW_MANAGER_SERVICE_KEY } from '../symbols'
import type {
    WindowId,
    WindowOptions,
    WindowPosition,
    WindowSize,
} from '../types'

export function useWindowManager() {
    const service = inject(WINDOW_MANAGER_SERVICE_KEY)

    if (!service) {
        throw new Error(
            '[Relationship-UI] WindowManager was not installed. Use app.use(createWindowManager()).',
        )
    }

    const store = useWindowManagerStore()

    return {
        windows: computed(() => store.windows),
        activeWindowId: computed(() => store.activeWindowId),
        activeWindow: computed(() => store.activeWindow),
        windowCount: computed(() => store.windowCount),

		find: (id: WindowId) => service.find(id),

        open: (options: WindowOptions) => service.open(options),

        close: (id: WindowId) => service.close(id),

        focus: (id: WindowId) => service.focus(id),

        minimize: (id: WindowId) => service.minimize(id),

        maximize: (id: WindowId) => service.maximize(id),

        restore: (id: WindowId) => service.restore(id),

        move: (id: WindowId, position: Partial<WindowPosition>) => service.move(id, position),

        resize: (id: WindowId, size: Partial<WindowSize>, position?: Partial<WindowPosition>) => service.resize(id, size, position),
    }
}
