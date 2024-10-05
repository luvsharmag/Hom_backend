import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getCards, getSingleCard } from "../controller/cards.js";


const router = express();

router.get("/getAllCards",isAuthenticated,getCards);
router.get("/:cardId",isAuthenticated,getSingleCard);

export default router;
