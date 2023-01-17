import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    PlacePostResponse: {
        ...API_STANDARD(),
        key: {
            type: TYPES.string,
            description: '<description>',
        },
    },
};
