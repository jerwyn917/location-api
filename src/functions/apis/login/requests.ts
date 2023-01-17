import { HttpRequest } from '../../../libs/Contracts/HttpRequest';

export class LoginRequest implements HttpRequest {
    email: string;
    password: string;
}
