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
        this.loadData();
    }

    public get Cheeses(): Cheese[] {
        return this.cheeses;
    }

    public get Orders(): Order[] {
        return this.orders;
    }

    public loadData = () => {
        const cheesesData = this.loadFileFromResource("cheeses.json", "[]");
        const purchasesData = this.loadFileFromResource("purchases.json", "[]");
        this.cheeses = [...JSON.parse(cheesesData)] as [];
        this.orders = [...JSON.parse(purchasesData)] as [];
    };

    public saveData = () => {
        fs.writeFileSync(
            path.join(__dirname, `${this.resourcePath}/purchases.json`),
            JSON.stringify(this.orders)
        );
    };

    private loadFileFromResource = (fileName: string, defaultValue: string) => {
        const filePath = path.join(
            __dirname,
            `${this.resourcePath}/${fileName}`
        );
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, "utf-8");
        }
        return defaultValue;
    };
}

export default new MockDatabase();
