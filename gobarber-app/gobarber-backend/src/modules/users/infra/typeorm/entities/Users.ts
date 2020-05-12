import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column() // varchar is the default type
    name!: string;

    @Column() // varchar is the default type
    password!: string;

    @Column() // varchar is the default type
    email!: string;

    @Column()
    avatar!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

export default User;
