import { Model } from './Model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users',
})
export class UserModel extends Model {
    @PrimaryGeneratedColumn('uuid')
    public user_id: string;

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
