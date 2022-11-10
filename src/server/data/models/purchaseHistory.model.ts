export interface PurchaseHistory {
    id: string;
    totalPrice: number;
    orders: Order[];
}

export interface Order {
    cheeseId: number;
    quantity: number;
}
