import * as express from "express";
import {
    handleGetAllCheeses,
    handlePurchaseCheese,
    handleGetRecentPurchases,
} from "./controllers/purchases.controller";
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/api/cheeses", handleGetAllCheeses);
router.post("/api/cheeses/purchase", bodyParser.json(), handlePurchaseCheese);
router.get("/api/cheeses/purchase", handleGetRecentPurchases);

export default router;
