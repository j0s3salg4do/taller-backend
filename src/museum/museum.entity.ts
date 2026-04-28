import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MuseumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  foundedBefore: number;
}
