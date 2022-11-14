import { Order, OrderItem } from "./../../data/models/purchaseHistory.model";
import {
    getAllCheeses,
    getCheeseById,
    getOrderWithTotalPrices,
    isValidOrder,
    getOrderHistory,
    getItemTotalPrices,
} from "../../services/cheese.service";
import mockDatabase from "../../data/mock-database";
import { Cheese } from "../../data/models/cheese.model";

// Global variables to be used in some tests

// test cheese
const cheese: Cheese = {
    id: 1,
    title: "Cheese Name",
    price: 12,
    description: "Cheese Description",
    category: "yummy",
    image: "image link",
};
// test orders
const order1 = {
    id: 1,
    totalPrice: 120,
    orderItems: [] as any,
    date: new Date("July 12, 2022").toUTCString(),
};
const order2 = {
    id: 2,
    totalPrice: 120,
    orderItems: [] as any,
    date: new Date("August 29, 2022").toUTCString(),
};

// Mock get functions
const mockGetDataCheese = jest.spyOn(mockDatabase, "Cheeses", "get");
const mockGetDataOrder = jest.spyOn(mockDatabase, "Orders", "get");

afterEach(() => {
    jest.clearAllMocks();
});

describe("getAllCheeses", () => {
    test("should return all cheeses", () => {
        mockGetDataCheese.mockReturnValue([cheese]);
        const result: Cheese[] = getAllCheeses();
        expect(result).toEqual([cheese]);
    });

    test("should return no cheese", () => {
        mockGetDataCheese.mockReturnValue([]);
        const result: Cheese[] = getAllCheeses();
        expect(result).toEqual([]);
    });
});

describe("getCheeseById", () => {
    test("should return cheeseId", () => {
        mockGetDataCheese.mockReturnValue([cheese]);
        const result: Cheese | undefined = getCheeseById(cheese.id);
        expect(result).toEqual(cheese);
    });

    test("should return no cheese", () => {
        mockGetDataCheese.mockReturnValue([cheese]);
        const result: Cheese | undefined = getCheeseById(100);
        expect(result).toBe(undefined);
    });
});

describe("getItemTotalPrices", () => {
    test("should return correct total prices", () => {
        const orderItems: OrderItem[] = [{ cheese: cheese, quantity: 2 }];
        const result: OrderItem[] = getItemTotalPrices(orderItems);
        const expectedResult = orderItems.map((n) => {
            return { ...n, totalPrice: n.cheese.price * n.quantity };
        });
        expect(result).toEqual(expectedResult);
    });

    test("should return no item", () => {
        const orderItems: OrderItem[] = [];
        const result: OrderItem[] = getItemTotalPrices(orderItems);
        expect(result).toEqual([]);
    });
});

describe("getOrderWithTotalPrices", () => {
    test("should return correct order price", () => {
        let orderItems: OrderItem[] = [{ cheese: cheese, quantity: 2 }];
        const result: Order = getOrderWithTotalPrices(orderItems);
        orderItems = getItemTotalPrices(orderItems);
        const expectedTotalPrice = orderItems.reduce((acc, item) => {
            return acc + (item.totalPrice || 0);
        }, 0);
        expect(result.totalPrice).toEqual(expectedTotalPrice);
        expect(result.orderItems).toEqual(orderItems);
    });

    test("should return correct order price for multiple items", () => {
        let orderItems: OrderItem[] = [
            { cheese, quantity: 2 },
            { cheese: { ...cheese, id: 2, price: 20 }, quantity: 5 },
        ];
        const result: Order = getOrderWithTotalPrices(orderItems);
        orderItems = getItemTotalPrices(orderItems);
        const expectedTotalPrice = orderItems.reduce((acc, item) => {
            return acc + (item.totalPrice || 0);
        }, 0);
        expect(result.totalPrice).toEqual(expectedTotalPrice);
        expect(result.orderItems).toEqual(orderItems);
    });

    test("totalPrice should be zero for empty orders", () => {
        const result: Order = getOrderWithTotalPrices([]);
        expect(result.totalPrice).toBe(0);
        expect(result.orderItems).toEqual([]);
    });
});

describe("getOrderHistory", () => {
    test("should return history", () => {
        mockGetDataOrder.mockReturnValue([]);
        const result = getOrderHistory();
        expect(result).toEqual([]);
    });

    test("should return history in desc order", () => {
        mockGetDataOrder.mockReturnValue([order1, order2]);
        const result = getOrderHistory();
        expect(result).toEqual([order2, order1]);
    });

    test("should return empty array as no purchase", () => {
        mockGetDataOrder.mockReturnValue([]);
        const result = getOrderHistory();
        expect(result).toEqual([]);
    });
});

describe("isValidOrder", () => {
    test("valid purchase", () => {
        const orderItems: OrderItem[] = [{ cheese: cheese, quantity: 2 }];
        const result = isValidOrder(orderItems);
        expect(result).toBe(true);
    });
    test("empty cart", () => {
        const orderItems: OrderItem[] = [];
        const result = isValidOrder(orderItems);
        expect(result).toBe(false);
    });

    test("order item does not have quantity", () => {
        const orderItems: OrderItem[] = [{ cheese } as any];
        const result = isValidOrder(orderItems);
        expect(result).toBe(false);
    });

    test("order item does not have sufficient cheese info", () => {
        const orderItems: OrderItem[] = [
            { cheese: { name: "cheese" } as any, quantity: 3 },
        ];
        const result = isValidOrder(orderItems);
        expect(result).toBe(false);
    });
});
