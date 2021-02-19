import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';
import { Purchase } from './Purchase';

@Index('user_id_UNIQUE', ['id'], { unique: true })
@Index('email_UNIQUE', ['email'], { unique: true })
@Entity('user', { schema: 'descart' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'display_name' })
  displayName: string;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @ManyToMany('Product', 'users')
  @JoinTable({
    name: 'favoriteproduct',
    joinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'product_id', referencedColumnName: 'id' }],
    schema: 'descart',
  })
  products: Product[];

  @ManyToMany('Purchase', 'users')
  purchases: Purchase[];

  @OneToMany('Purchase', 'user')
  purchases2: Purchase[];
}
