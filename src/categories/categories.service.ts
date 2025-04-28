import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity';
import { ICategory } from './interfaces';
import { CreateCategoryDto } from './DTOs';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

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
