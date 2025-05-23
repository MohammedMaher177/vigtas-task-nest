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
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .where('LOWER(category.name) = LOWER(:name)', { name })
      .getOne();

    if (!category) throw new NotFoundException(`Category with name ${name} not found`);
    return category
  }

  findAll(): Promise<ICategory[]> {
    return this.categoryRepository.find({ relations: ["products"] });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ICategory> {
    const category = await this.find(id);

    if (updateCategoryDto.name) {
      const existingCategory = await this.findByName(updateCategoryDto.name);

      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  async find(id: string): Promise<ICategory> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ["products"] })
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category
  }

  async remove(id: string): Promise<{ message: string }> {
    const category = await this.find(id)

    if (category.products?.length > 0) {
      throw new ConflictException('Cannot delete category because it has many products.');
    }

    await this.categoryRepository.delete(id);
    return { message: "Category deleted successfully" }
  }
}
