
import { inject } from 'vue'
import type { RelationshipService } from '../services/RelationshipService';
import { RELATIONSHIP_SERVICE_KEY } from '../symbols';

export function useRelationshipService(): RelationshipService {
	const service = inject<RelationshipService>(
		RELATIONSHIP_SERVICE_KEY,
	)

	if (!service) {
		throw new Error('RelationshipService has not been provided.')
	}

  	return service
}
