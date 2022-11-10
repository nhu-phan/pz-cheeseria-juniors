export interface Order {
    id: number;
    totalPrice: number;
    orderItems: OrderItem[];
}

export interface OrderItem {
    cheeseId: number;
    quantity: number;
    totalPrice?: number;
}
