import { HttpResponse } from '../libs/Contracts/HttpResponse';

export class DefaultResponse {
    static STANDARD: HttpResponse = {
        code: 200,
        message: 'Success',
    };
}
