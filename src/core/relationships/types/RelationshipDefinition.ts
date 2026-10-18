// import type { Component } from 'vue';

export type RelationshipCardinality = 'one' | 'many';

export type EntityConstructor<TEntity = unknown> = abstract new (...args: never[]) => TEntity;

export type AsyncEntityResolver<TEntity = unknown> = () => Promise<EntityConstructor<TEntity>>;

// export type AsyncComponentResolver = () => Promise<Component>

export type RelationshipDefinition<TSource = unknown, TTarget = unknown> = {
	name: string;
	cardinality: RelationshipCardinality;
	resolveEntity: AsyncEntityResolver<TTarget>;
	getValue?: (source: TSource) => unknown;
	// resolveComponent: AsyncComponentResolver;
}

