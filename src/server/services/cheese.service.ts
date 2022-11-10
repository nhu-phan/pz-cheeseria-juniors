import { Order, OrderItem } from "./../data/models/purchaseHistory.model";
import { Cheese } from "./../data/models/cheese.model";
import mockDatabase from "../data/mock-database";

export const getAllCheeses = (): Cheese[] => {
    return mockDatabase.Cheeses;
};

export const getCheeseById = (cheeseId: number): Cheese | undefined => {
    return mockDatabase.Cheeses.find((i) => i.id === cheeseId);
};

export const saveOrder = (orderItems: OrderItem[]): Order => {
    orderItems = orderItems.map((item) => {
        const cheese = getCheeseById(item.cheeseId);
        return {
            ...item,
            totalPrice: (cheese?.price || 0) * item.quantity,
        };
    });
    const orderPrice = orderItems.reduce((accumulator, orderItem) => {
        return accumulator + (orderItem.totalPrice || 0);
    }, 0);

    const order: Order = {
        id: Math.floor(Date.now() / 100000),
        totalPrice: orderPrice,
        orderItems,
    };

    mockDatabase.Orders.push(order);
    mockDatabase.saveData();
    return order;
};
