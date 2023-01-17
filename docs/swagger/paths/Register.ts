import { TAGS_NAMES } from '../config';
import { METHODS } from '../default';
import { LANGUAGE } from '../language';
import * as faker from 'faker';

const key = 'register';
const method = METHODS.post;
const tag = TAGS_NAMES.AUTHENTICATED;
const summary = 'User registration';
const parameters = {
    body: {
        schema: 'RegisterRequest',
        example: {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            middle_name: faker.name.middleName(),
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
                first_name: 'first_name is required',
                last_name: 'last_name is required',
                middle_name: 'middle_name is required',
                email: 'email is required',
                password: 'password is required',
            },
        },
    },
    200: {
        description: LANGUAGE.RESPONSES.DEFAULT['200'],
        schema: 'RegisterResponse',
        example: {
            code: 200,
            message: 'Successfully registered',
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
