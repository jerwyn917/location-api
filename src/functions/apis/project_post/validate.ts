import { Validation } from '../../../libs/Validation';
import { joi } from '../../../libs/Joi';
import { ProjectPostRequest } from './requests';

export default (request: ProjectPostRequest): ProjectPostRequest => {
    const schema = joi
        .object({
            name: joi.string().max(50).required(),
            description: joi.string().required(),
        })
        .required();

    const validate = new Validation<ProjectPostRequest>(schema);
    return validate.validate(request);
};
