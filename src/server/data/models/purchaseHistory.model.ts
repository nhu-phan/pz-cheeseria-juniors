import { Cheese } from './cheese.model';
export interface Order {
    id: number;
    totalPrice: number;
    orderItems: OrderItem[];
}

export interface OrderItem {
    cheese: Cheese;
    quantity: number;
    totalPrice?: number;
}
