import { Validation } from '../../../libs/Validation';
import { joi } from '../../../libs/Joi';
import { PlacePostRequest } from './requests';

export default (request: PlacePostRequest): PlacePostRequest => {
    const schema = joi
        .object({
            user_id: joi.string().required(),
            description: joi.string().required(),
            longitude: joi.string().required(),
            latitude: joi.string().required(),
        })
        .required();

    const validate = new Validation<PlacePostRequest>(schema);
    return validate.validate(request);
};
