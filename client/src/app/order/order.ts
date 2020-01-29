import { Product } from '../product/product';

export interface Order {
  products: Product[] | string[];
  //user: User;
  _id ?: string;
}
