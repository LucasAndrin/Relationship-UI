import type { RelationshipDefinition } from '../types'

export function defineRelationship<TSource = unknown, TTarget = unknown>(
  definition: RelationshipDefinition<TSource, TTarget>,
): RelationshipDefinition<TSource, TTarget> {
  return definition;
}
