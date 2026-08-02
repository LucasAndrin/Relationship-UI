import { inject } from 'vue'
import { ComponentStackKey } from '../symbols'

export function useComponentStack() {
    const stack = inject(ComponentStackKey)
    if (!stack) {
        throw new Error('ComponentStackService was not installed.');
    }
    return stack
}
