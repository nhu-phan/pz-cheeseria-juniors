import { OrderItemModel } from "./orderItem.model";

export interface OrderModel {
    id: number,
    totalPrice: number,
    orderItems: OrderItemModel[],
    date:string
};