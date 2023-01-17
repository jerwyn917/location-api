import { execute } from './handler';
import { ApiGatewayEvent } from '../../../libs/Contracts/ApiGatewayEvent';
import * as faker from 'faker';
import { UserFaker } from '../../../seeder/fakers/UserFaker';
import { PlaceFaker } from '../../../seeder/fakers/PlaceFaker';

test('404: PLACE NOT FOUND', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify({}),
        pathParameters: {
            place_id: faker.datatype.uuid(),
        },
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
    const user = await UserFaker.seed();
    const place = await PlaceFaker.seed({ user_id: user.user_id });
    const event: ApiGatewayEvent = {
        body: JSON.stringify({}),
        pathParameters: {
            place_id: place.place_id,
        },
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
    expect(response).toHaveProperty('data.deleted_at');

    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});
