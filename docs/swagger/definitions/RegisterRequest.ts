import { TYPES } from '../default';

module.exports.default = {
    RegisterRequest: {
        first_name: {
            type: TYPES.string,
            description: 'First name of the user',
        },
        last_name: {
            type: TYPES.string,
            description: 'Last name of the user',
        },
        middle_name: {
            type: TYPES.string,
            description: 'Middle name of the user',
        },
        email: {
            type: TYPES.string,
            description: 'Email of the user',
        },
        password: {
            type: TYPES.string,
            description: 'Password of the user',
        },
    },
};
