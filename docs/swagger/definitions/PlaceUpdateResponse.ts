import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    PlaceUpdateResponse: {
        ...API_STANDARD(),
        key: {
            type: TYPES.string,
            description: '<description>',
        },
    },
};
