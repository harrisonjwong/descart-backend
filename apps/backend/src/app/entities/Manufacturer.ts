import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('manufacturer_id_UNIQUE', ['id'], { unique: true })
@Entity('manufacturer', { schema: 'descart' })
export class Manufacturer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @OneToMany('Product', 'manufacturer')
  products: Product[];
}
