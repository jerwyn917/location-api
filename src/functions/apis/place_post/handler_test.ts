import { execute } from './handler';
import { ApiGatewayEvent } from '../../../libs/Contracts/ApiGatewayEvent';
import { PlacePostRequest } from './requests';
import * as faker from 'faker';
import { UserFaker } from '../../../seeder/fakers/UserFaker';

test('422: PARAMETER ERROR', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<PlacePostRequest>{
            user_id: '',
            description: '',
            longitude: '',
            latitude: '',
        }),
    };

    const result = await execute(event);
    const response = JSON.parse(result.body);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('errors');
    expect(response).toHaveProperty('errors.user_id');
    expect(response).toHaveProperty('errors.description');
    expect(response).toHaveProperty('errors.longitude');
    expect(response).toHaveProperty('errors.latitude');

    expect(result.statusCode).toBe(422);
    expect(response.code).toBe(422);
});

test('200: SUCCESS', async () => {
    const user = await UserFaker.seed();
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<PlacePostRequest>{
            user_id: user.user_id,
            description: faker.lorem.words(5),
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        }),
    };

    const result = await execute(event);
    const response = JSON.parse(result.body);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('data.place_id');
    expect(response).toHaveProperty('data.user_id');
    expect(response).toHaveProperty('data.description');
    expect(response).toHaveProperty('data.longitude');
    expect(response).toHaveProperty('data.latitude');
    expect(response).toHaveProperty('data.created_at');

    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});
