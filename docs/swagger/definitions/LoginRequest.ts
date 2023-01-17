import { TYPES } from '../default';

module.exports.default = {
    LoginRequest: {
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
