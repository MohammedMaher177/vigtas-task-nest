import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ICategory } from './interfaces';
import { CreateCategoryDto } from './DTOs';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<ICategory[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<ICategory> {
    return this.categoriesService.find(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
