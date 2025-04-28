import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity';
import { ICategory } from './interfaces';
import { CreateCategoryDto, UpdateCategoryDto } from './DTOs';

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

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.find(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateCategoryDto.name) {
      const existingCategory = await this.findByName(updateCategoryDto.name);

      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  find(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id }, relations: ["products"] })
  }

  async remove(id: string): Promise<{ message: string }> {
    const category = await this.find(id)
    
    if (category.products?.length > 0) {
      throw new ConflictException('Cannot delete category because it has many products.');
    }

    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    await this.categoryRepository.delete(id);
    return { message: "Category deleted successfully" }
  }
}
