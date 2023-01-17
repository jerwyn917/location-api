import { HttpResponse } from '../libs/Contracts/HttpResponse';

export class DefaultResponse {
    static STANDARD: HttpResponse = {
        code: 200,
        message: 'Success',
    };

    static PLACE_NOT_FOUND: HttpResponse = {
        code: 404,
        message: 'Place not found',
    };
}
