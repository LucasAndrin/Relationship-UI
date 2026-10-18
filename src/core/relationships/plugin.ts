
import type { App } from 'vue'
import { inject } from 'vue'

import { RelationshipService } from './services/RelationshipService'
import { WINDOW_MANAGER_SERVICE_KEY } from '../window-manager/symbols'

import type { WindowManagerService } from '../window-manager/services/WindowManagerService'
import { RELATIONSHIP_SERVICE_KEY } from './symbols';

export function createRelationships() {
	return {
		install(app: App) {
			const windowManager = app.runWithContext(() =>
				inject<WindowManagerService>(WINDOW_MANAGER_SERVICE_KEY),
			)

			if (!windowManager) {
				throw new Error('WindowManagerService must be installed before RelationshipService.')
			}

			const service = new RelationshipService(windowManager)

			app.provide(RELATIONSHIP_SERVICE_KEY, service)
		},
	}
}
