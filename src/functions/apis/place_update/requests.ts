import { HttpRequest } from '../../../libs/Contracts/HttpRequest';

export class PlaceUpdateRequest implements HttpRequest {
    description: string;
    longitude: string;
    latitude: string;
}
