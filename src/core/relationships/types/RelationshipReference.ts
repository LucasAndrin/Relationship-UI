import type { RelationshipDefinition } from './RelationshipDefinition'

export type RelationshipDefinitionModule<TSource = unknown, TTarget = unknown> = {
  	default: RelationshipDefinition<TSource, TTarget>
}

export type RelationshipDefinitionLoader<TSource = unknown, TTarget = unknown> = () => Promise<RelationshipDefinitionModule<TSource, TTarget>>

export type RelationshipReference<TSource = unknown, TTarget = unknown> = RelationshipDefinitionLoader<TSource, TTarget>
