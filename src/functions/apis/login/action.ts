import { Connection } from 'typeorm';
import { LoginRequest } from './requests';
import { UserRepository } from '../../../repositories/UserRepository';
import { Responses } from './responses';
import { Bcrypt } from '../../../libs/Bcrypt';
import { UserInterface } from '../../../helper/Interface';

export class LoginAction {
    private connection: Connection;
    private userRepository: UserRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.userRepository = this.connection.getCustomRepository(UserRepository);
    }

    async execute(request: LoginRequest): Promise<UserInterface> {
        const user = await this.userRepository.findOne({ email: request.email });
        if (!user) throw Responses.USER_NOT_FOUND;

        const validate = Bcrypt.validateHashPassword(request.password, user.password);
        if (!validate) throw Responses.USER_NOT_FOUND;

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
