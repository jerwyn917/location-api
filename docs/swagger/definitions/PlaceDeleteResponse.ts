import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    PlaceDeleteResponse: {
        ...API_STANDARD(),
        key: {
            type: TYPES.string,
            description: '<description>',
        },
    },
};
