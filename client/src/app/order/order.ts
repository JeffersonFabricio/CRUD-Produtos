import { Product } from '../product/product';

export interface Order {
  stock: number;
  total: number;
  products: Product[];
  //user: User;
  _id ?: string;
}
