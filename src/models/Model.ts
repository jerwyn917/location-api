import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export class Model extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // timestamps
    @CreateDateColumn({
        type: 'varchar',
    })
    public created_at: string;

    @UpdateDateColumn({
        type: 'varchar',
    })
    public updated_at: string;

    @DeleteDateColumn({
        type: 'varchar',
    })
    public deleted_at?: string;
}
