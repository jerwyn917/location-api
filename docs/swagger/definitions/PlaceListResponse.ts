import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    PlaceListResponse: {
        ...API_STANDARD(),
        key: {
            type: TYPES.string,
            description: '<description>',
        },
    },
};
