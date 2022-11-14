import { Cheese } from "./models/cheese.model";
import { Order } from "./models/purchaseHistory.model";
import * as fs from "fs";
import * as path from "path";

/**
 * A mock-up database to get all cheeses and recent purchases.
 */
class MockDatabase {
    private cheeses: Cheese[];
    private orders: Order[];
    private resourcePath = "../resources";

    constructor() {
        if (process.env.NODE_ENV === "test") {
            this.resourcePath = "../../../resources";
        }
        this.loadData();
    }

    public get Cheeses(): Cheese[] {
        return this.cheeses;
    }

    public get Orders(): Order[] {
        return this.orders;
    }

    public loadData = () => {
        const cheesesData = fs.readFileSync(
            path.join(__dirname, `${this.resourcePath}/cheeses.json`),
            "utf-8"
        );
        const purchasesData = fs.readFileSync(
            path.join(__dirname, `${this.resourcePath}/purchases.json`),
            "utf-8"
        );
        this.cheeses = [...JSON.parse(cheesesData)] as [];
        this.orders = [...JSON.parse(purchasesData)] as [];
    };

    public saveData = () => {
        fs.writeFileSync(
            path.join(__dirname, `${this.resourcePath}/purchases.json`),
            JSON.stringify(this.orders)
        );
    };
}

export default new MockDatabase();
