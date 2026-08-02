import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { ComponentStackItem } from '../types';

export const useComponentStackStore = defineStore('component-stack', () => {
  const stack = ref<ComponentStackItem[]>([]);

  const size = computed(() => {
	return stack.value.length;
  });

  const isEmpty = computed(() => {
	return size.value === 0;
  });

  const top = computed<ComponentStackItem | undefined>(() => {
    return stack.value[stack.value.length - 1];
  });

  function push(item: ComponentStackItem): void {
    stack.value.push(item);
  }

  function pop(): ComponentStackItem | undefined {
    return stack.value.pop();
  }

  function remove(id: ComponentStackItem['id']): ComponentStackItem | undefined {
    const index = stack.value.findIndex(item => item.id === id);
    if (index === -1) {
      return;
    }
    const [removed] = stack.value.splice(index, 1);
    return removed;
  }

  function replace(item: ComponentStackItem): ComponentStackItem | undefined {
    const removed = pop();
    push(item);
    return removed;
  }

  function clear(): ComponentStackItem[] {
    const items = [...stack.value];
    stack.value = [];
    return items;
  }

  return {
    // State
    stack,

    // Getters
    size,
    isEmpty,
    top,

    // Actions
    push,
    pop,
    remove,
    replace,
    clear,
  };
});
