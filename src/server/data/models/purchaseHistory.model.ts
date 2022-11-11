import { Cheese } from "./cheese.model";
export interface Order {
    id: number;
    totalPrice: number;
    orderItems: OrderItem[];
    date: string;
}

export interface OrderItem {
    cheese: Cheese;
    quantity: number;
    totalPrice?: number;
}
