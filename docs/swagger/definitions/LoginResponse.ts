import { API_STANDARD, TYPES } from '../default';

module.exports.default = {
    LoginResponse: {
        ...API_STANDARD(),
        data: {
            type: TYPES.object,
            description: 'Successfully registered',
            properties: {
                id: {
                    type: TYPES.string,
                    description: 'Unique identifier of the user',
                },
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
                created_at: {
                    type: TYPES.string,
                    description: 'Timestamp of the user',
                },
            },
        },
    },
};
