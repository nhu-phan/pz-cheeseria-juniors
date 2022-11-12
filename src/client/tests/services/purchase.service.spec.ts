import {
    getRecentPurchases,
    getCheeses,
} from "./../../services/purchase.service";
import { CartItemType } from "../../App";
import { handleCheesePurchase } from "../../services/purchase.service";

/* Unit tests for client/services/purchase.service.ts */

// Define global mocks and flow before/afer each unit tests
let fetchMock;
let alertMock;

beforeEach(() => {
    fetchMock = jest.fn();
    alertMock = jest.fn();
    global.fetch = fetchMock;
    global.alert = alertMock;
});

afterEach(() => {
    (global.fetch as any).mockClear();
    (global.alert as any).mockClear();
});

// Tests getCheeses function 
describe("getCheeses", () => {
    it("should return correct cheeses", async () => {
        // Mockup data for cheeses
        const cheese1 = {
            id: 1,
            title: "Cheese 1",
            price: 10,
            description: "Cheese 1 description",
            category: "yummy",
            image: "image link",
        };
        const cheese2 = {
            id: 2,
            title: "Cheese 2",
            price: 12,
            description: "Cheese 2 description",
            category: "soft",
            image: "image link",
        };
        // Create mock api response
        fetchMock.mockResolvedValue({
            status: 200,
            json() {
                return [cheese1, cheese2]; 
            },
        });
        // Call function
        let result = await getCheeses();
        // Check if all cheeses returned are as expected
        expect(result).toEqual([cheese1, cheese2]);
    });

    it("should return no cheese", async () => {
        // Create mock api response
        fetchMock.mockResolvedValue({
            status: 200,
            json() {
                return []; // No purchase history
            },
        });
        // Call function
        let result = await getCheeses();
        // Check that no cheese should be returned
        expect(result).toEqual([]);
    });
});

// Tests for handleCheesePurchase
describe("handleCheesePurchase", () => {
    // Valid Purchase
    test("should be able to purchase cheese", async () => {
        // Prepare variables for the test
        const cartItem: CartItemType[] = [
            {
                id: 100,
                category: "category",
                description: "description",
                image: "image",
                price: 13,
                title: "title",
                amount: 1,
            },
        ];
        const mockSetCheese = jest.fn();
        fetchMock.mockResolvedValue({ status: 201 });
        // Call the method
        await handleCheesePurchase(cartItem, mockSetCheese);
        // Checks if results are as expected
        expect(mockSetCheese).toHaveBeenCalledWith([]);
        expect(alertMock).toHaveBeenCalledWith("Purchase successful!");
    });

    // Invalid Purchase i.e. cart is empty
    test("should not able to purchase cheese", async () => {
        const cartItem: [] = [];
        fetchMock.mockResolvedValue({ status: 500 });
        const mockSetCheese = jest.fn();
        await handleCheesePurchase(cartItem, mockSetCheese);
        expect(mockSetCheese).not.toHaveBeenCalledWith([]);
        expect(alertMock).toHaveBeenCalledWith("Something went wrong!");
    });
});
describe("getRecentPurchases", () => {
    it("should return recent purchases", async () => {
        // Create a mockup purchase history data
        const mockHistory = [
            {
                id: 1,
                totalPrice: 2.42,
                orderItems: [
                    {
                        cheese: {
                            id: 2,
                            title: "Cheese Test",
                            price: 2.21,
                            description: "Description of cheese",
                            category: "category of cheese blah blaj",
                            image: "image link",
                        },
                        quantity: 2,
                        totalPrice: 58.0,
                    },
                ],
                date: "Fri, 11 Nov 2022 07:18:28 GMT",
            },
        ];
        // Create mock api response
        fetchMock.mockResolvedValue({
            status: 200,
            json() {
                return mockHistory;
            },
        });
        // Call function
        let result = await getRecentPurchases();

        // Check if mock purchase history is correctly returned
        expect(result).toBe(mockHistory);
    });

    it("should return empty array if no order in history", async () => {
        // Create mock api response
        fetchMock.mockResolvedValue({
            status: 200,
            json() {
                return []; // No purchase history
            },
        });
        // Call function
        let result = await getRecentPurchases();

        // Check if mock purchase history is correctly returned
        expect(result).toEqual([]);
    });
});
