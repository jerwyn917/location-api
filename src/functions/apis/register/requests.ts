import { HttpRequest } from '../../../libs/Contracts/HttpRequest';

export class RegisterRequest implements HttpRequest {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    password: string;
}
