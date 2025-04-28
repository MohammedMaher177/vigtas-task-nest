import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

//   @OneToMany(() => Product, (product) => product.category)
//   products: Product[];
}
