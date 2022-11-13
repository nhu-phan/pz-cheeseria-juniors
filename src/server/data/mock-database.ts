import { Cheese } from "./models/cheese.model";
import { Order } from "./models/purchaseHistory.model";
import * as fs from "fs";

const purchasesData = require("./purchases.json");
const cheesesData = require("./cheeses.json");

/**
 * A mock-up database to get all cheeses and recent purchases.
 */
class MockDatabase {
    private cheeses: Cheese[];
    private orders: Order[];

    constructor() {
        this.refreshDatabase();
    }

    public get Cheeses(): Cheese[] {
        return this.cheeses;
    }

    public get Orders(): Order[] {
        return this.orders;
    }

    public refreshDatabase = () => {
        this.cheeses = [...cheesesData] as [];
        this.orders = [...purchasesData] as [];
    };

    public saveData = () => {
        fs.writeFileSync(
            "./src/server/data/purchases.json",
            JSON.stringify(this.orders)
        );
    };
}

export default new MockDatabase();
