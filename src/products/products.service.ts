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

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const { categoryId, ...productData } = createProductDto;

        const category = await this.categoryService.find(categoryId);
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        const product = this.productRepository.create({ ...productData, category });
        return this.productRepository.save(product);
    }


    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
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
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findByCategory(categoryId: string): Promise<Product[]> {
        return this.productRepository.find({ where: { category: { id: categoryId } } });
    }


    async remove(id: string): Promise<{ message: string }> {
        const product = await this.find(id)
        if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
        await this.productRepository.delete(id);
        return { message: "Category deleted successfully" }
    }
}
