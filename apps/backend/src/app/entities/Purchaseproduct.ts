import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase } from './Purchase';
import { Product } from './Product';

@Index('purchase_id', ['purchaseId'], {})
@Index('product_id', ['productId'], {})
@Entity('purchaseproduct', { schema: 'descart' })
export class Purchaseproduct {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'purchase_id' })
  purchaseId: number;

  @Column('int', { name: 'product_id' })
  productId: number;

  @Column('text', { name: 'price' })
  price: string;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @Column('int', { name: 'index' })
  index: number;

  @ManyToOne('Purchase', 'purchaseproducts', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'purchase_id', referencedColumnName: 'id' }])
  purchase: Purchase;

  @ManyToOne('Product', 'purchaseproducts', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
