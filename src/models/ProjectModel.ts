import { Model } from './Model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'projects',
})
export class ProjectModel extends Model {
    @PrimaryGeneratedColumn('uuid')
    public project_id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    public name: string;

    @Column({
        type: 'text',
    })
    public description: string;
}
