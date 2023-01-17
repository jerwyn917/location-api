import { execute } from './handler';
import { ApiGatewayEvent } from '../../../libs/Contracts/ApiGatewayEvent';
import { UserFaker } from '../../../seeder/fakers/UserFaker';
import { PlaceFaker } from '../../../seeder/fakers/PlaceFaker';

test('404: NO PLACE FOUND', async () => {
    const event: ApiGatewayEvent = {
        body: JSON.stringify({}),
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
    await PlaceFaker.seed({ user_id: user.user_id });
    await PlaceFaker.seed({ user_id: user.user_id });
    await PlaceFaker.seed({ user_id: user.user_id });

    const event: ApiGatewayEvent = {
        body: JSON.stringify({}),
    };

    const result = await execute(event);
    const response = JSON.parse(result.body);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('data');

    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});
