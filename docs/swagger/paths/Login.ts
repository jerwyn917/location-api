import { TAGS_NAMES } from '../config';
import { METHODS } from '../default';
import { LANGUAGE } from '../language';
import * as faker from 'faker';

const key = 'login';
const method = METHODS.post;
const tag = TAGS_NAMES.AUTHENTICATED;
const summary = 'User authentication';
const parameters = {
    body: {
        schema: 'LoginRequest',
        example: {
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
        },
    },
};
const responses = {
    422: {
        description: LANGUAGE.RESPONSES.DEFAULT['422'],
        schema: 'Response422',
        example: {
            code: 422,
            message: 'Parameter error: Please provide required parameter',
            errors: {
                email: 'email is required',
                password: 'password is required',
            },
        },
    },
    404: {
        description: LANGUAGE.RESPONSES.DEFAULT['404'],
        schema: 'Response404',
        example: {
            code: 404,
            message: 'User not found',
        },
    },
    200: {
        description: LANGUAGE.RESPONSES.DEFAULT['200'],
        schema: 'LoginResponse',
        example: {
            code: 200,
            message: 'Success',
            data: {
                id: faker.datatype.uuid(),
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                middle_name: faker.name.middleName(),
                email: faker.internet.email(),
                created_at: faker.datatype.datetime(),
            },
        },
    },
};

module.exports.default = {
    key,
    method,
    tag,
    summary,
    parameters,
    responses,
};
