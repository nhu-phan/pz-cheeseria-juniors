import { handleGetAllCheeses } from "./controllers/purchases.controller";
import * as express from "express";
const router = express.Router();

router.get("/api/cheeses", handleGetAllCheeses);
export default router;
