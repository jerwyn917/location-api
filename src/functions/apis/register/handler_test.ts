import { execute } from './handler';
import { ApiGatewayEvent } from '../../../libs/Contracts/ApiGatewayEvent';
import { RegisterRequest } from './requests';
import * as faker from 'faker';

test('422: PARAMETER ERROR', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<RegisterRequest>{
            first_name: '',
            last_name: '',
            middle_name: '',
            email: '',
            password: '',
        }),
    };

    const result = await execute(event);
    const response = JSON.parse(result.body);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('errors');
    expect(response).toHaveProperty('errors.first_name');
    expect(response).toHaveProperty('errors.last_name');
    expect(response).toHaveProperty('errors.middle_name');
    expect(response).toHaveProperty('errors.email');
    expect(response).toHaveProperty('errors.password');

    expect(result.statusCode).toBe(422);
    expect(response.code).toBe(422);
});

test('200: SUCCESS', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<RegisterRequest>{
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            middle_name: faker.name.middleName(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
        }),
    };

    const result = await execute(event);
    const response = JSON.parse(result.body);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('data.id');
    expect(response).toHaveProperty('data.first_name');
    expect(response).toHaveProperty('data.last_name');
    expect(response).toHaveProperty('data.middle_name');
    expect(response).toHaveProperty('data.created_at');

    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});
