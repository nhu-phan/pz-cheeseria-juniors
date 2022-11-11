import { CheeseModel } from './order.cheese';

export interface OrderItemModel {
        cheese: CheeseModel;
        quantity: number,
        totalPrice: number,
};