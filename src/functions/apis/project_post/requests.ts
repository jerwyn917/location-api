import { HttpRequest } from '../../../libs/Contracts/HttpRequest';

export class ProjectPostRequest implements HttpRequest {
    name: string;
    description: string;
}
