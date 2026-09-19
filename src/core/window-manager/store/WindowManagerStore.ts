import { defineStore } from 'pinia'
import type { WindowId, WindowState } from '../types';

export const useWindowManagerStore = defineStore('window-manager', {
	state: () => ({
		windows: [] as WindowState[],
		activeWindowId: null as WindowId | null,
		nextZIndex: 1000,
	}),

	getters: {
		activeWindow(state) {
			return state.windows.find(window => window.id === state.activeWindowId)
				|| null;
		},

		windowCount(state) {
			return state.windows.length
		},
	},

	actions: {
		getWindow(id: WindowId) {
			return this.windows.find(window => window.id === id) || null;
		},

		addWindow(window: WindowState) {
			this.windows.push(window)
		},

		removeWindow(id: WindowId) {
			const index = this.windows.findIndex(window => window.id === id)
			if (index === -1) {
				return
			}

			this.windows.splice(index, 1)

			if (this.activeWindowId === id) {
				this.activeWindowId = null;
			}
		},

		updateWindow(id: WindowId, patch: Partial<Omit<WindowState, 'id'>>) {
			const window = this.windows.find(window => window.id === id);
			if (!window) {
				return
			}
			Object.assign(window, patch)
		},

		setActiveWindow(id: WindowId | null) {
			this.activeWindowId = id
		},

		bringToFront(id: WindowId) {
			const window = this.windows.find(window => window.id === id)
			if (!window) {
				return
			}
			this.nextZIndex++
			window.zIndex = this.nextZIndex
			this.activeWindowId = id
		},

		getNextZIndex() {
			this.nextZIndex++
			return this.nextZIndex
		},
	},
})
