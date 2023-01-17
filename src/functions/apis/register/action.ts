import { Connection } from 'typeorm';
import { RegisterRequest } from './requests';
import { UserRepository } from '../../../repositories/UserRepository';
import { Bcrypt } from '../../../libs/Bcrypt';
import { UserInterface } from '../../../helper/Interface';

export class RegisterAction {
    private connection: Connection;
    private userRepository: UserRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.userRepository = this.connection.getCustomRepository(UserRepository);
    }

    async execute(request: RegisterRequest): Promise<UserInterface> {
        const user = await this.userRepository
            .create({
                first_name: request.first_name,
                last_name: request.last_name,
                middle_name: request.middle_name,
                email: request.email,
                password: Bcrypt.generateHashPassword(request.password),
            })
            .save();

        return {
            id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name,
            email: user.email,
            created_at: user.created_at,
        };
    }
}
