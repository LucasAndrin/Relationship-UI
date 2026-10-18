
import type { EntityConstructor, RelationshipDefinition, RelationshipReference } from '../types'

type CachedRelationshipDefinition = RelationshipDefinition<unknown, unknown>

type RelationshipLoader = () => Promise<unknown>

type CachedEntityConstructor = EntityConstructor<unknown>

export class RelationshipResolver {
  	private readonly definitions = new WeakMap<
		RelationshipLoader,
		Promise<CachedRelationshipDefinition>
	>()

	private readonly entities = new WeakMap<
		CachedRelationshipDefinition,
		Promise<CachedEntityConstructor>
	>()

  	async resolve<TSource = unknown, TTarget = unknown>(
		reference: RelationshipReference<TSource, TTarget>,
	): Promise<RelationshipDefinition<TSource, TTarget>> {
		const loader = reference as RelationshipLoader

		const cached = this.definitions.get(loader)

		if (cached) {
			return cached as Promise<
			RelationshipDefinition<TSource, TTarget>
			>
		}

		const pending = reference().then(module => {
			return module.default;
		}).catch((error: unknown) => {
			this.definitions.delete(loader)
			throw error;
		})

		this.definitions.set(loader, pending as Promise<CachedRelationshipDefinition>)

		return pending
	}

	async resolveEntity<
		TSource = unknown,
		TTarget = unknown,
	>(
		definition: RelationshipDefinition<TSource, TTarget>,
	): Promise<EntityConstructor<TTarget>> {
		const cached = this.entities.get(definition as CachedRelationshipDefinition);

		if (cached) {
			return cached as Promise<EntityConstructor<TTarget>>
		}

		const pending = definition.resolveEntity().catch((error: unknown) => {
			this.entities.delete(definition as CachedRelationshipDefinition);
			throw error;
		});

		this.entities.set(definition as CachedRelationshipDefinition, pending as Promise<CachedEntityConstructor>);

		return pending;
  	}
}
