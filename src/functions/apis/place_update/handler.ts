import { Databases } from '../../../libs/Mysql';
import { API_RESPONSE, THROW_API_ERROR } from '../../../libs/Response';
import { APIHttpResponse } from '../../../libs/Contracts/APIHttpResponse';
import { ApiGatewayEvent } from '../../../libs/Contracts/ApiGatewayEvent';

import Validate from './validate';
import { Responses } from './responses';
import { PlaceUpdateRequest } from './requests';
import { PlaceUpdateAction } from './action';

export async function execute(event: ApiGatewayEvent): Promise<APIHttpResponse> {
    try {
        const place_id = event.pathParameters?.place_id ?? '0';
        const request: PlaceUpdateRequest = Validate(JSON.parse(event.body));
        const connection = await Databases.getConnection();
        const action = new PlaceUpdateAction(connection);
        const data = await action.execute(request, place_id);

        return API_RESPONSE({
            ...Responses.STATUS_200,
            data,
        });
    } catch (error) {
        return THROW_API_ERROR(error);
    } finally {
        await Databases.closeConnection();
    }
}
