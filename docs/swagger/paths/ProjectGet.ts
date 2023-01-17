import { TAGS_NAMES } from '../config';
import { METHODS } from '../default';
import { LANGUAGE } from '../language';

const key = '<api_path>';
const method = METHODS.post;
const tag = TAGS_NAMES.RESOURCES;
const summary = '<Add function summary here>';
const parameters = {
    body: {
        schema: '<Definition Name>',
        example: {
           // Payload sample here
        },
    },
};
const responses = {
    422: {
        description: LANGUAGE.RESPONSES.DEFAULT["422"],
        schema: 'Response422',
        example: {
            code: 422,
            message: 'Parameter error: Please provide required parameter',
            errors: {
                // Sample 422 error messages
            },
        },
    },
    200: {
        description: '<Success message description>',
        schema: '<ResponseNameHere>',
        example: {
            code: 200,
            message: '<Success message here>',
            // Sample 200 response here
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