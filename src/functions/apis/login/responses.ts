import { HttpResponse } from '../../../libs/Contracts/HttpResponse';

export class Responses {
    static STATUS_200: HttpResponse = {
        code: 200,
        message: 'Success',
    };

    static USER_NOT_FOUND: HttpResponse = {
        code: 404,
        message: 'User not found',
    };
}
