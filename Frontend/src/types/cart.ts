
import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AddToCartAction = (product: Product, quantity?: number) => void;
export type RemoveFromCartAction = (productId: string) => void;
export type UpdateCartItemAction = (productId: string, quantity: number) => void;
export type ClearCartAction = () => void;
