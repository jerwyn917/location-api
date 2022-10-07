import { Model } from './Model';
import { Column, Entity } from 'typeorm';

@Entity({
    name: 'users',
})
export class UserModel extends Model {
    @Column({
        type: 'varchar',
        length: 50,
    })
    public first_name: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    public last_name: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    public middle_name: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    public email: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    public password: string;
}
