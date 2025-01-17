import { getOrderHistory, saveOrder } from "./../services/cheese.service";
import { NextFunction, Request, Response } from "express";
import { getAllCheeses } from "../services/cheese.service";

// Return all cheeses from json file as response
export const handleGetAllCheeses = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const cheeses = getAllCheeses();
        return response.json(cheeses);
    } catch (error) {
        // Internal error
        return response.status(500).json({ message: error.message });
    }
};

// Saves order to mock database and json file for later retrieval.
export const handlePurchaseCheese = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const purchasedItems = request.body;
        const [error, result] = saveOrder(purchasedItems);
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }
        response.status(201).json(result);
    } catch (error) {
        // Internal error
        response.status(500).json({ message: error.message });
    }
};

// Return all recent purchases
export const handleGetRecentPurchases = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        // Sends array of all recent orders as response
        const orderHistory = getOrderHistory();
        response.status(200).json(orderHistory);
    } catch (error) {
        // Internal error
        response.status(500).json({ message: error.message });
    }
};
