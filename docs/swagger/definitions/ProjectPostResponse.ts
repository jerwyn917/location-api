import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    ProjectPostResponse: {
        ...API_STANDARD(),
        key: {
            type: TYPES.string,
            description: '<description>',
        },
    },
}