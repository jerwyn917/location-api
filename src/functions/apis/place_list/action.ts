import { Connection } from 'typeorm';
import { PlaceRepository } from '../../../repositories/PlaceRepository';
import { Responses } from './responses';
import { PlaceData } from '../../../helper/Interface';

export class PlaceListAction {
    private connection: Connection;
    private placeRepository: PlaceRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.placeRepository = this.connection.getCustomRepository(PlaceRepository);
    }

    async execute(): Promise<PlaceData[]> {
        const places = await this.placeRepository.getPlaces();
        if (!places.length) throw Responses.STATUS_404;

        return places.map((place) => {
            return {
                place_id: place.place_id,
                user_id: place.user_id,
                description: place.description,
                longitude: place.longitude,
                latitude: place.latitude,
                created_at: place.created_at,
            };
        });
    }
}
