import { HttpResponse } from '../../../libs/Contracts/HttpResponse';

export class Responses {
    static STATUS_200: HttpResponse = {
        code: 200,
        message: 'Successfully found',
    };

    static STATUS_404: HttpResponse = {
        code: 404,
        message: 'No place found',
    };
}
