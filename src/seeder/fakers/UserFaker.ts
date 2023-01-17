import { Databases } from '../../libs/Mysql';
import { UserModel } from '../../models/UserModel';
import { UserRepository } from '../../repositories/UserRepository';
import * as faker from 'faker';

export class UserFaker {
    static async seed(args?: unknown): Promise<UserModel> {
        const connection = await Databases.getConnection();
        const repository = connection.getCustomRepository(UserRepository);

        let model = new UserModel();
        model.first_name = faker.name.firstName();
        model.last_name = faker.name.lastName();
        model.middle_name = faker.name.middleName();
        model.email = faker.internet.email();
        model.password = faker.random.alphaNumeric(10);

        if (args) model = Object.assign(model, args);
        await repository.save(model);
        return model;
    }
}
