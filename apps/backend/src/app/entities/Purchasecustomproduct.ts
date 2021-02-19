import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase } from './Purchase';

@Index('purchase_id', ['purchaseId'], {})
@Entity('purchasecustomproduct', { schema: 'descart' })
export class Purchasecustomproduct {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'purchase_id' })
  purchaseId: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'price' })
  price: string;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @Column('int', { name: 'index' })
  index: number;

  @ManyToOne('Purchase', 'purchasecustomproducts', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'purchase_id', referencedColumnName: 'id' }])
  purchase: Purchase;
}
