import { saveOrder } from "./../services/cheese.service";
import { NextFunction, Request, Response } from "express";
import { getAllCheeses } from "../services/cheese.service";

export const handleGetAllCheeses = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const cheeses = getAllCheeses();
        return response.json(cheeses);
    } catch (error) {
        return response.status(500).json({ error });
    }
};

export const handlePurchaseCheese = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const purchasedItems = request.body;
        const result = saveOrder(purchasedItems);
        response.json(result);
    } catch (error) {
        response.status(500).json({ error });
    }
};
