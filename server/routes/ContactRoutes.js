import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";


const contactRoutes=Router();
contactRoutes.post("/search",verifyToken,searchContacts);
contactRoutes.get("/get-contacts-for-dm",verifyToken,getContactsForDMList);

export default contactRoutes