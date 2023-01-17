import { EntityRepository, Repository } from 'typeorm';
import { PlaceModel } from '../models/PlaceModel';

@EntityRepository(PlaceModel)
export class PlaceRepository extends Repository<PlaceModel> {
    async getPlaceById(place_id: string): Promise<PlaceModel | undefined> {
        return this.createQueryBuilder().where('place_id = :place_id', { place_id }).getOne();
    }

    async getPlaces(): Promise<PlaceModel[]> {
        return this.createQueryBuilder().orderBy('created_at').getMany();
    }
}
