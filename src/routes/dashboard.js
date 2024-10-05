import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { deleteCard, newCard, updateCard } from "../controller/cards.js";
import {updateNavLink,deleteNavLink,newNavlink} from "../controller/navlinks.js";

const router = express.Router();

router.post("/createCard",isAuthenticated,isAdmin,newCard);
router.route("/cards/:cardId").put(isAuthenticated,isAdmin,updateCard).delete(isAuthenticated,isAdmin,deleteCard);


router.post("/createNavLinks",newNavlink);
router.route("/navLink/:linkId").put(updateNavLink).delete(deleteNavLink);

export default router;