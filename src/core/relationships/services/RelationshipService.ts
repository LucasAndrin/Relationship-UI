import type { Component } from 'vue';
import type { WindowId, WindowManagerService, WindowOptions } from '@/src/core/window-manager';
import type { EntityConstructor, RelationshipDefinition, RelationshipPresentation, RelationshipReference } from '../types';
import { RelationshipResolver } from './RelationshipResolver';


type RelationshipOwner<TSource extends object> = EntityConstructor<TSource> & {
	relationships: Record<string, RelationshipReference<TSource, unknown>>;
}

type RegisteredPresentation = RelationshipPresentation<unknown, unknown>

export class RelationshipService {
	private readonly resolver: RelationshipResolver;

	private readonly presentations = new WeakMap<EntityConstructor<object>, Map<string, RegisteredPresentation>>;

	constructor(
		private readonly windowManager: WindowManagerService,
		resolver = new RelationshipResolver(),
	) {
		this.resolver = resolver;
	}

	registerPresentation<TSource extends object, TTarget = unknown>(
		owner: EntityConstructor<TSource>,
		relationshipName: string,
		presentation: RelationshipPresentation<TSource, TTarget>,
	): void {
		let registrations = this.presentations.get(owner);
		if (!registrations) {
			registrations = new Map();
			this.presentations.set(owner, registrations);
		}
		registrations.set(relationshipName, presentation as RegisteredPresentation);
	}

	async open<TSource extends object>(
		source: TSource,
		relationshipName: string,
	): Promise<WindowId> {
		const owner = source.constructor as RelationshipOwner<TSource>;
		const reference = owner.relationships?.[relationshipName];
		if (!reference) {
			throw new Error(`Relationship ${relationshipName} is not defined.`);
		}

		const presentation = this.presentations.get(owner)?.get(relationshipName);
		if (!presentation) {
			throw new Error(`No presentation registered for relationship "${relationshipName}"`);
		}

		const definition = await this.resolver.resolve(reference);
		const targetEntity = await this.resolver.resolveEntity(definition);

		const componentModule = await presentation.resolveComponent();
		const component: Component = componentModule.default;

		const getProps = presentation.getProps as
			| ((context: { source: TSource, definition: RelationshipDefinition<TSource, unknown>}) => Record<string, unknown>)
			| undefined;

		const props = getProps?.({
			source,
			definition,
		}) ?? {}

		const options: WindowOptions = {
			title: presentation.title ?? definition.name,
			component,
			props: {
				...props,
				source,
				relationship: definition,
				targetEntity,
			},
		}

    	return this.windowManager.open(options)
	}
}
