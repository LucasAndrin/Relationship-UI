import { markRaw } from 'vue'

import type {
    ComponentStackItem,
    ComponentStackOptions
} from '../types'

import { useComponentStackStore } from '../store/ComponentStackStore';

export class ComponentStackService {

	private get store() {
		return useComponentStackStore();
	}

    push(
        component: ComponentStackItem['component'],
        props: ComponentStackItem['props'] = {},
        options: ComponentStackOptions = {}
    ) {

        const item: ComponentStackItem = {
            id: crypto.randomUUID(),
            component: markRaw(component),
            props,
            options,
        };

        this.store.push(item);

        return item;
    }

    pop() {
        return this.store.pop();
    }

    remove(id: string) {
        return this.store.remove(id);
    }

    replace(
        component: ComponentStackItem['component'],
        props: ComponentStackItem['props'] = {},
        options: ComponentStackOptions = {}
    ) {

        const item: ComponentStackItem = {
            id: crypto.randomUUID(),

            component: markRaw(component),

            props,

            options,
        };

        this.store.replace(item);

        return item;
    }

    clear() {
        return this.store.clear();
    }
}

export const componentStack = new ComponentStackService();
