import { IProduct } from "src/products/interfaces";

export interface ICategory {
    id: string;
    name: string;
    products: IProduct[]
}