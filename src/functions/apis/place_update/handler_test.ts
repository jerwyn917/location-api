import { execute } from './handler';
import { ApiGatewayEvent } from '../../../libs/Contracts/ApiGatewayEvent';
import { PlaceUpdateRequest } from './requests';
import * as faker from 'faker';
import { UserFaker } from '../../../seeder/fakers/UserFaker';
import { PlaceFaker } from '../../../seeder/fakers/PlaceFaker';

test('422: PARAMETER ERROR', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<PlaceUpdateRequest>{
            description: '',
            longitude: '',
            latitude: '',
        }),
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
    expect(response).toHaveProperty('errors');
    expect(response).toHaveProperty('errors.description');
    expect(response).toHaveProperty('errors.longitude');
    expect(response).toHaveProperty('errors.latitude');

    expect(result.statusCode).toBe(422);
    expect(response.code).toBe(422);
});

test('404: PLACE NOT FOUND', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<PlaceUpdateRequest>{
            description: faker.lorem.words(5),
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        }),
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
    console.log(place);
    const event: ApiGatewayEvent = {
        body: JSON.stringify(<PlaceUpdateRequest>{
            description: faker.lorem.words(5),
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        }),
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

    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});
