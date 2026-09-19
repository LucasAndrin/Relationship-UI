import type { App } from 'vue'
import { useWindowManagerStore } from './store/WindowManagerStore'
import { WindowManagerService } from './services/WindowManagerService'
import { WINDOW_MANAGER_SERVICE_KEY } from './symbols'

export function createWindowManager() {
    return {
        install(app: App) {
            const store = useWindowManagerStore()
            const service = new WindowManagerService(store)
            app.provide(WINDOW_MANAGER_SERVICE_KEY, service)
        },
    }
}
