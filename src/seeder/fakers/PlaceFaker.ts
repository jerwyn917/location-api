import { Databases } from '../../libs/Mysql';
import { PlaceModel } from '../../models/PlaceModel';
import { PlaceRepository } from '../../repositories/PlaceRepository';
import * as faker from 'faker';

export class PlaceFaker {
    static async seed(args?: unknown): Promise<PlaceModel> {
        const connection = await Databases.getConnection();
        const repository = connection.getCustomRepository(PlaceRepository);

        let model = new PlaceModel();
        model.user_id = faker.datatype.uuid();
        model.description = faker.lorem.words(5);
        model.longitude = faker.address.longitude();
        model.latitude = faker.address.latitude();

        if (args) model = Object.assign(model, args);
        await repository.save(model);
        return model;
    }
}
