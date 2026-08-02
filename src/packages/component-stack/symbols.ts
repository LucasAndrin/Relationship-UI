import type { InjectionKey } from 'vue'
import type { ComponentStackService } from './services/ComponentStackService';

export const ComponentStackKey = Symbol('ComponentStack') as InjectionKey<ComponentStackService>
