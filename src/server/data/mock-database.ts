import { Cheese } from "./models/cheese.model";
import { PurchaseHistory } from "./models/purchaseHistory.model";

const purchasesData = require("./purchases.json");
const cheesesData = require("./cheeses.json");
const fs = require("fs");

/**
 * A mock-up database to get all cheeses and recent purchases.
 */
class MockDatabase {
    private cheeses: Cheese[];
    private purchaseHistory: PurchaseHistory[];

    constructor() {
        this.refreshDatabase();
    }

    public get Cheeses(): Cheese[] {
        return this.cheeses;
    }

    public get PurchaseHistory(): PurchaseHistory[] {
        return this.purchaseHistory;
    }

    public refreshDatabase = () => {
        this.cheeses = [...cheesesData] as [];
        this.purchaseHistory = [...purchasesData] as [];
    };

    public saveData = () => {
        fs.writeFileSync(
            "./src/server/data/purchases.json",
            JSON.stringify(this.purchaseHistory)
        );
    };
}

export default new MockDatabase();
