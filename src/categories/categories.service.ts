import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity';
import { ICategory } from './interfaces';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<ICategory[]> {
    return this.categoryRepository.find();
  }

  find(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
