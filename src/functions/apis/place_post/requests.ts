import { HttpRequest } from '../../../libs/Contracts/HttpRequest';

export class PlacePostRequest implements HttpRequest {
    user_id: string;
    description: string;
    longitude: string;
    latitude: string;
}
