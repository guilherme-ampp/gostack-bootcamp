import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// The decorator transforms the class into an entity
// mapping - indicating the class Appointment represents rows
// in appointments table
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // varchar is the default type
    provider: string;

    @Column('timestamp with time zone') // pass the type
    date: Date;

    // we do not need to explicitly create the constructor method anymore
}

export default Appointment;
