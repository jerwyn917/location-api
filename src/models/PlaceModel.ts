import { Model } from './Model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'places',
})
export class PlaceModel extends Model {
    @PrimaryGeneratedColumn('uuid')
    public place_id: string;

    @Column({
        type: 'varchar',
    })
    public user_id: string;

    @Column({
        type: 'text',
    })
    public description: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    public longitude: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    public latitude: string;
}
