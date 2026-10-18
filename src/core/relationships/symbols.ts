import type { InjectionKey } from 'vue';
import type { RelationshipService } from './services';

export const RELATIONSHIP_SERVICE_KEY = Symbol('relationship-ui:relationship-service') as InjectionKey<RelationshipService>;
