import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Store } from './Store';
import { Purchasecustomproduct } from './Purchasecustomproduct';
import { Purchaseproduct } from './Purchaseproduct';

@Index('purchase_id_UNIQUE', ['id'], { unique: true })
@Index('store_id', ['storeId'], {})
@Index('user_id', ['userId'], {})
@Entity('purchase', { schema: 'descart' })
export class Purchase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'store_id' })
  storeId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('text', { name: 'price' })
  price: string;

  @Column('int', { name: 'num_items' })
  numItems: number;

  @Column('date', { name: 'purchased_at' })
  purchasedAt: string;

  @ManyToMany('User', 'purchases')
  @JoinTable({
    name: 'favoritepurchase',
    joinColumns: [{ name: 'purchase_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    schema: 'descart',
  })
  users: User[];

  @ManyToOne('Store', 'purchases', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;

  @ManyToOne('User', 'purchases2', {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany('Purchasecustomproduct', 'purchase')
  purchasecustomproducts: Purchasecustomproduct[];

  @OneToMany('Purchaseproduct', 'purchase')
  purchaseproducts: Purchaseproduct[];
}
