import { UserModel } from '../models/UserModel';
import { UserFaker } from './fakers/UserFaker';
import { PlaceFaker } from './fakers/PlaceFaker';
import { PlaceModel } from '../models/PlaceModel';

test('UserModel: SUCCESS', async () => {
    const user = await UserFaker.seed();
    console.log(user);
    expect(user).toBe<UserModel>(user as UserModel);
});

test('PlaceModel: SUCCESS', async () => {
    const user = await UserFaker.seed();
    const place = await PlaceFaker.seed({ user_id: user.user_id });
    console.log(user);
    console.log(place);
    expect(place).toBe<PlaceModel>(place as PlaceModel);
});
