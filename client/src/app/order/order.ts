import { Product } from '../product/product';

export interface Order {
  stock: number;
  products: Product[] | string[];
  //user: User;
  _id ?: string;
}
