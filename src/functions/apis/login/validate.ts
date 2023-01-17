import { Validation } from '../../../libs/Validation';
import { joi } from '../../../libs/Joi';
import { LoginRequest } from './requests';

export default (request: LoginRequest): LoginRequest => {
    const schema = joi
        .object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        })
        .required();

    const validate = new Validation<LoginRequest>(schema);
    return validate.validate(request);
};
