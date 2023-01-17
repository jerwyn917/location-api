import { Connection } from 'typeorm';
import { PlaceRepository } from '../../../repositories/PlaceRepository';
import { PlaceData } from '../../../helper/Interface';
import { DefaultResponse } from '../../../helper/Errors';

export class PlaceGetAction {
    private connection: Connection;
    private placeRepository: PlaceRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.placeRepository = this.connection.getCustomRepository(PlaceRepository);
    }

    async execute(place_id: string): Promise<PlaceData> {
        const place = await this.placeRepository.getPlaceById(place_id);
        if (!place) throw DefaultResponse.PLACE_NOT_FOUND;

        return {
            place_id: place.place_id,
            user_id: place.user_id,
            description: place.description,
            longitude: place.longitude,
            latitude: place.latitude,
            created_at: place.created_at,
        };
    }
}
