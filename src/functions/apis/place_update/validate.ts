import { Validation } from '../../../libs/Validation';
import { joi } from '../../../libs/Joi';
import { PlaceUpdateRequest } from './requests';

export default (request: PlaceUpdateRequest): PlaceUpdateRequest => {
    const schema = joi
        .object({
            description: joi.string().required(),
            longitude: joi.string().required(),
            latitude: joi.string().required(),
        })
        .required();

    const validate = new Validation<PlaceUpdateRequest>(schema);
    return validate.validate(request);
};
