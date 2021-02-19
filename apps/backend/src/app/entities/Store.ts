import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase } from './Purchase';
import { Storeproduct } from './Storeproduct';

@Index('store_id_UNIQUE', ['id'], { unique: true })
@Entity('store', { schema: 'descart' })
export class Store {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'image_url', nullable: true })
  imageUrl: string | null;

  @Column('text', { name: 'website_url', nullable: true })
  websiteUrl: string | null;

  @OneToMany('Purchase', 'store')
  purchases: Purchase[];

  @OneToMany('Storeproduct', 'store')
  storeproducts: Storeproduct[];
}
