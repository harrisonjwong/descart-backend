import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('category_id_UNIQUE', ['id'], { unique: true })
@Entity('category', { schema: 'descart' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @OneToMany('Product', 'category')
  products: Product[];
}
