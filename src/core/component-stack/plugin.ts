import type { App } from 'vue'

import { ComponentStackService } from './services/ComponentStackService'
import { ComponentStackKey } from './symbols'

import StackRenderer from './renderer/ComponentStackRenderer.vue'

export function installComponentStack(app: App) {
    const service = new ComponentStackService();
    app.provide(ComponentStackKey, service);
    app.component('ComponentStackRenderer', StackRenderer);
}
