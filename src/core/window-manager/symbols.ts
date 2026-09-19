import type { InjectionKey } from 'vue'
import type { WindowManagerService } from './services/WindowManagerService'

export const WINDOW_MANAGER_SERVICE_KEY:
    InjectionKey<WindowManagerService> =
    Symbol('relationship-ui:window-manager')
