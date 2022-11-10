import { Cheese } from "./../data/models/cheese.model";
import mockDatabase from "../data/mock-database";

export const getAllCheeses = (): Cheese[] => {
    return mockDatabase.Cheeses;
};
