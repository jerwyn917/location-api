import { Connection } from 'typeorm';
import { PlaceUpdateRequest } from './requests';
import { DefaultResponse } from '../../../helper/Errors';
import { PlaceData } from '../../../helper/Interface';
import { PlaceRepository } from '../../../repositories/PlaceRepository';

export class PlaceUpdateAction {
    private connection: Connection;
    private placeRepository: PlaceRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.placeRepository = this.connection.getCustomRepository(PlaceRepository);
    }

    async execute(request: PlaceUpdateRequest, place_id: string): Promise<PlaceData> {
        const place = await this.placeRepository.getPlaceById(place_id);
        if (!place) throw DefaultResponse.PLACE_NOT_FOUND;

        place.description = request.description;
        place.longitude = request.longitude;
        place.latitude = request.latitude;
        await this.placeRepository.save(place);

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
