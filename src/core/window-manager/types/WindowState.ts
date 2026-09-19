import type { Component } from 'vue';
import type { WindowId } from './WindowId';
import type { WindowPosition } from './WindowPosition';
import type { WindowSize } from './WindowSize';

export type WindowState = {
	id: WindowId

	title: string

	component: Component

	props?: Record<string, unknown>

	position: WindowPosition

	size: WindowSize

	minimized: boolean

	maximized: boolean

	zIndex: number
}
