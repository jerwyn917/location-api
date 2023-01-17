import { Connection } from 'typeorm';
import { PlacePostRequest } from './requests';
import { PlaceData } from '../../../helper/Interface';
import { PlaceRepository } from '../../../repositories/PlaceRepository';
import { ProjectRepository } from '../../../repositories/ProjectRepository';

export class PlacePostAction {
    private connection: Connection;
    private placeRepository: PlaceRepository;
    private projectRepository: ProjectRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.placeRepository = this.connection.getCustomRepository(PlaceRepository);
        this.projectRepository = this.connection.getCustomRepository(ProjectRepository);
    }

    async execute(request: PlacePostRequest): Promise<PlaceData> {
        const place = await this.placeRepository
            .create({
                user_id: request.user_id,
                description: request.description,
                longitude: request.longitude,
                latitude: request.latitude,
            })
            .save();

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
