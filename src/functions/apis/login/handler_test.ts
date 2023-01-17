import { execute } from './handler';
import { ApiGatewayEvent } from '../../../libs/Contracts/ApiGatewayEvent';
import { LoginRequest } from './requests';
import { UserFaker } from '../../../seeder/fakers/UserFaker';
import * as faker from 'faker';
import { Bcrypt } from '../../../libs/Bcrypt';

test('422: PARAMETER ERROR', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<LoginRequest>{
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
    expect(response).toHaveProperty('errors.email');
    expect(response).toHaveProperty('errors.password');

    expect(result.statusCode).toBe(422);
    expect(response.code).toBe(422);
});

test('404: USER NOT FOUND', async () => {
    const user = await UserFaker.seed();
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<LoginRequest>{
            email: user.email,
            password: faker.random.alphaNumeric(10),
        }),
    };

    const result = await execute(event);
    const response = JSON.parse(result.body);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');

    expect(result.statusCode).toBe(404);
    expect(response.code).toBe(404);
});

test('200: SUCCESS', async () => {
    const raw_password = faker.random.alphaNumeric(10);
    const encrypted_password = Bcrypt.generateHashPassword(raw_password);
    const user = await UserFaker.seed({ password: encrypted_password });
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<LoginRequest>{
            email: user.email,
            password: raw_password,
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
