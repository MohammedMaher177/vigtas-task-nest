import { Product } from 'src/products/entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';

@Entity('categories')
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
