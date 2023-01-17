import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    PlaceGetResponse: {
        ...API_STANDARD(),
        key: {
            type: TYPES.string,
            description: '<description>',
        },
    },
};
