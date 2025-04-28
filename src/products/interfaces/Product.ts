import { ICategory } from "src/categories/interfaces";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    category: ICategory
}