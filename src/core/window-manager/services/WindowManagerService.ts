import { markRaw } from 'vue'

import { useWindowManagerStore } from '../store/WindowManagerStore'

import type {
	WindowId,
	WindowOptions,
	WindowPosition,
	WindowSize,
	WindowState,
} from '../types'

const DEFAULT_POSITION: WindowPosition = {
	x: 100,
	y: 100,
}

const DEFAULT_SIZE: WindowSize = {
	width: 640,
	height: 480,
}

const DEFAULT_TITLE = 'Window'

export class WindowManagerService {
	private readonly store

	constructor(store = useWindowManagerStore()) {
		this.store = store
	}

	private generateId(requestedId: WindowId|undefined, exists: (id: WindowId) => boolean) {
		if (!requestedId) {
			return crypto.randomUUID();
		}
		if (!exists(requestedId)) {
			return requestedId;
		}
		return `${requestedId}-${crypto.randomUUID()}`;
	}

	find(id: WindowId) {
		return this.store.windows.find(window => window.id === id) || null;
	}

	open(options: WindowOptions): WindowId {
		const requestedId = options.id;
		if (requestedId && options.reuse !== false) {
			const existing = this.find(requestedId);
			if (existing) {
				this.focus(requestedId);
				return requestedId;
			}
		}


		const id = this.generateId(requestedId, id => this.find(id) !== null);

		const zIndex = this.store.getNextZIndex()

		const window: WindowState = {
			id,
			title: options.title || DEFAULT_TITLE,
			component: markRaw(options.component),
			props: options.props,
			position: {
				...DEFAULT_POSITION,
				...options.position,
			},
			size: {
				...DEFAULT_SIZE,
				...options.size,
			},
			minimized: options.minimized || false,
			maximized: options.maximized || false,
			zIndex,
		}

		this.store.addWindow(window)
		this.store.setActiveWindow(id)

		return id
	}

	close(id: WindowId) {
		this.store.removeWindow(id)
	}

	focus(id: WindowId) {
		const window = this.store.windows.find(window => window.id === id)
		if (!window) {
			return
		}
		if (window.minimized) {
			this.restore(id)
			return
		}
		this.store.bringToFront(id)
	}

	minimize(id: WindowId) {
		const window = this.store.windows.find(window => window.id === id);
		if (!window) {
			return
		}

		this.store.updateWindow(id, {
			minimized: true,
		})

		if (this.store.activeWindowId === id) {
			this.store.setActiveWindow(null)
		}
	}

	maximize(id: WindowId) {
		const window = this.store.windows.find(window => window.id === id);
		if (!window) {
			return
		}

		this.store.updateWindow(id, {
			maximized: true,
			minimized: false,
		})

		this.store.bringToFront(id);
	}

	restore(id: WindowId) {
		const window = this.store.windows.find(window => window.id === id)
		if (!window) {
			return
		}

		this.store.updateWindow(id, {
			minimized: false,
			maximized: false,
		})

		this.store.bringToFront(id)
	}

	move(id: WindowId, position: Partial<WindowPosition>) {
		const window = this.store.windows.find(window => window.id === id)
		if (!window) {
			return
		}

		this.store.updateWindow(id, {
			position: {
				...window.position,
				...position,
			},
		})
	}

	resize(id: WindowId, size: Partial<WindowSize>, position?: Partial<WindowPosition>) {
		const window = this.store.windows.find(window => window.id === id)
		if (!window) {
			return
		}

		this.store.updateWindow(id, {
			size: {
				...window.size,
				...size,
			},
			...(position && {
				position: {
					...window.position,
					...position,
				}
			}),
		});
	}
}
