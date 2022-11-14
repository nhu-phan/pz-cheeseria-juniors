import { Order, OrderItem } from "./../data/models/purchaseHistory.model";
import { Cheese } from "./../data/models/cheese.model";
import mockDatabase from "../data/mock-database";
import * as _ from "lodash";

/* Get all the cheeses from json file*/
export const getAllCheeses = (): Cheese[] => {
    return mockDatabase.Cheeses;
};

/* Get cheese with the given id */
export const getCheeseById = (cheeseId: number): Cheese | undefined => {
    return mockDatabase.Cheeses.find((i) => i.id === cheeseId);
};

/* For each item in the order, calculate totalPrice */
export const getItemTotalPrices = (orderItems: OrderItem[]): OrderItem[] => {
    orderItems = orderItems.map((item) => {
        const cheese = getCheeseById(item.cheese.id)!;
        return {
            cheese,
            quantity: item.quantity,
            totalPrice: (cheese?.price || 0) * item.quantity,
        };
    });
    return orderItems;
};

// Return order with totalPrice (for entire order), totalPrice (for a cheese type), order date.
export const getOrderWithTotalPrices = (orderItems: OrderItem[]): Order => {
    orderItems = getItemTotalPrices(orderItems);
    const orderPrice = orderItems.reduce((accumulator, orderItem) => {
        return accumulator + (orderItem.totalPrice || 0);
    }, 0);

    const order: Order = {
        id: Math.floor(Date.now() / 100000),
        totalPrice: orderPrice,
        orderItems,
        date: new Date().toUTCString(),
    };
    return order;
};

// Checks if order is valid
export const isValidOrder = (orderItems: OrderItem[]): boolean => {
    // if order items is null
    if (!orderItems) return false;
    // if order items is empty
    if (!orderItems.length) return false;

    // if order has invalid item
    const invalidItem = orderItems.find(
        (item) => !item.cheese.id || !item.quantity
    );
    if (invalidItem) return false;

    // valid
    return true;
};

/* If order is valid, save order to mock database and json file */
export const saveOrder = (
    orderItems: OrderItem[]
): [{ message: string }?, Order?] => {
    const order: Order = getOrderWithTotalPrices(orderItems);
    if (!isValidOrder(orderItems)) {
        return [{ message: "Invalid Order" }];
    }
    // Valid order, so add to mock database
    mockDatabase.Orders.push(order);
    mockDatabase.saveData();
    return [undefined, order];
};

// Get order history, sorted by latest
export const getOrderHistory = () => {
    const orderHistory = mockDatabase.Orders;
    const sortedOrderHistory = _.orderBy(
        orderHistory,
        (o: Order) => new Date(o.date),
        ["desc"]
    );
    return sortedOrderHistory;
};
