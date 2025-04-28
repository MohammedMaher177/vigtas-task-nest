import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './DTOs';

@Controller('api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    async softDelete(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.productsService.find(id);
    }

    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    @Get('category/:categoryId')
    async findByCategory(@Param('categoryId') categoryId: string) {
        return this.productsService.findByCategory(categoryId);
    }
}
