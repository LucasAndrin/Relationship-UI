import type { Component, DefineComponent } from 'vue';
import { ComponentStackOptions } from './ComponentStackOptions';

export interface ComponentStackItem<
  TProps extends Record<string, unknown> = Record<string, unknown>
> {
  id: string;

  component: Component | DefineComponent;

  props?: TProps;

  options?: ComponentStackOptions;

//   state: {
// 	opened: boolean
// 	closed: boolean
// 	mounted: boolean
//   }

//   meta: {
// 	createdAt: number
//   }
}
