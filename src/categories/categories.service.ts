import { ConflictException, Injectable } from '@nestjs/common';
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
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {

    const existingCategory = await this.findByName(createCategoryDto.name);

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }


    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findByName(name: string): Promise<ICategory | undefined> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('LOWER(category.name) = LOWER(:name)', { name })
      .getOne();
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
