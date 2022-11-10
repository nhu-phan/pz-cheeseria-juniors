// Data Json Files
const purchasesData = require('./purchases.json');
const cheesesData = require('./cheeses.json');
const fs = require("fs");

export interface Cheese {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface Order {
    cheeseId: number;
    quantity: number;
}

export interface PurchaseHistory {
  id: string;
  totalPrice: number;
  orders: Order[]
}

// A mock database
class MockDatabase {
    private cheeses: Cheese[];
    private purchaseHistory: PurchaseHistory[];

    constructor() {
        this.refreshDatabase();
    }
    
    public get Cheeses() : Cheese[] {
        return this.cheeses
    }

    public get PurchaseHistory() : PurchaseHistory[] {
        return this.purchaseHistory;
    }

    public refreshDatabase = () => {
        this.cheeses = [...cheesesData] as [];
        this.purchaseHistory = [...purchasesData] as [];
    };

    public saveData = () => {
        fs.writeFileSync("./src/server/data/purchases.json", JSON.stringify(this.purchaseHistory));
    };
}

export default new MockDatabase();