import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './Store';
import { Product } from './Product';

@Index('store_id', ['storeId'], {})
@Index('product_id', ['productId'], {})
@Entity('storeproduct', { schema: 'descart' })
export class Storeproduct {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'store_id' })
  storeId: number;

  @Column('int', { name: 'product_id' })
  productId: number;

  @Column('text', { name: 'price' })
  price: string;

  @Column('text', { name: 'url', nullable: true })
  url: string | null;

  @ManyToOne('Store', 'storeproducts', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;

  @ManyToOne('Product', 'storeproducts', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
