import { Router } from "express";
import { createRet, deleteRet, upRet, getRet } from "../controllers/Rent.controller.js";
import { validatSchemas } from "../middlewares/validationSchema.js";
import { retSchemas } from "../schemas/retSchema.js";
const retRouter = Router()

retRouter.post("/rentals",validatSchemas(retSchemas), createRet);
retRouter.get("/rentals", getRet);
retRouter.delete("/rentals/:id", deleteRet);
retRouter.patch("/rentals/:id/return", upRet)

export default retRouter;