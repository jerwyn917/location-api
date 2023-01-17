import { Connection } from 'typeorm';
import { PlaceRepository } from '../../../repositories/PlaceRepository';
import { DefaultResponse } from '../../../helper/Errors';
import { PlaceData } from '../../../helper/Interface';

export class PlaceDeleteAction {
    private connection: Connection;
    private placeRepository: PlaceRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.placeRepository = this.connection.getCustomRepository(PlaceRepository);
    }

    async execute(place_id: string): Promise<PlaceData> {
        const place = await this.placeRepository.getPlaceById(place_id);
        if (!place) throw DefaultResponse.PLACE_NOT_FOUND;

        await this.placeRepository.softDelete(place);

        return {
            place_id: place.place_id,
            user_id: place.user_id,
            description: place.description,
            longitude: place.longitude,
            latitude: place.latitude,
            created_at: place.created_at,
            deleted_at: place.deleted_at,
        };
    }
}
