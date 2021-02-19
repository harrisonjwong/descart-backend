import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Manufacturer } from './Manufacturer';
import { Purchaseproduct } from './Purchaseproduct';
import { Storeproduct } from './Storeproduct';

@Index('product_id_UNIQUE', ['id'], { unique: true })
@Index('manufacturer_id', ['manufacturerId'], {})
@Entity('product', { schema: 'descart' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'image_url', nullable: true })
  imageUrl: string | null;

  @Column('int', { name: 'manufacturer_id', nullable: true })
  manufacturerId: number | null;

  @ManyToMany('User', 'products')
  users: User[];

  @ManyToOne('Manufacturer', 'products', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'manufacturer_id', referencedColumnName: 'id' }])
  manufacturer: Manufacturer;

  @OneToMany('Purchaseproduct', 'product')
  purchaseproducts: Purchaseproduct[];

  @OneToMany('Storeproduct', 'product')
  storeproducts: Storeproduct[];
}
