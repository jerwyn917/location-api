import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    ProjectGetResponse: {
        ...API_STANDARD(),
        key: {
            type: TYPES.string,
            description: '<description>',
        },
    },
}