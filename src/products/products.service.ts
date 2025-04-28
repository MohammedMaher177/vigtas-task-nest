import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity';
import { CreateProductDto, UpdateProductDto } from './DTOs';
import { CategoriesService } from 'src/categories/categories.service';
import { IProduct } from './interfaces';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        private readonly categoryService: CategoriesService,

    ) { }

    async create(createProductDto: CreateProductDto): Promise<IProduct> {
        const { categoryId, ...productData } = createProductDto;

        const category = await this.categoryService.find(categoryId);
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        const product = this.productRepository.create({ ...productData, category });
        return this.productRepository.save(product);
    }


    async update(id: string, updateProductDto: UpdateProductDto): Promise<IProduct> {
        const product = await this.find(id);

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        const { categoryId, ...productData } = updateProductDto;

        if (categoryId) {
            const category = await this.categoryService.find(categoryId);

            if (!category) {
                throw new NotFoundException(`Category with ID ${categoryId} not found`);
            }
            product.category = category;
        }

        Object.assign(product, productData);
        return this.productRepository.save(product);
    }

    async find(id: string): Promise<IProduct> {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async findAll(): Promise<IProduct[]> {
        return this.productRepository.find({ relations: ["category"] });
    }

    async findByCategory(categoryId: string): Promise<IProduct[]> {
        return this.productRepository.find({ where: { category: { id: categoryId } } });
    }


    async remove(id: string): Promise<{ message: string }> {
        const product = await this.find(id)
        if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
        await this.productRepository.delete(id);
        return { message: "Product deleted successfully" }
    }
}
