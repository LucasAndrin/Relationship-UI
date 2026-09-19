import type { Component } from 'vue';
import type { WindowPosition } from './WindowPosition';
import type { WindowSize } from './WindowSize';
import type { WindowId } from './WindowId';

export type WindowOptions = {
	id?: WindowId

	title?: string

	component: Component

	props?: Record<string, unknown>

	position?: Partial<WindowPosition>

	size?: Partial<WindowSize>

	minimized?: boolean

	maximized?: boolean

	reuse?: boolean
}
