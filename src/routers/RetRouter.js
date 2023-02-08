import { Router } from "express";
import { createRet, deleteRet, upRet, getRet } from "../controllers/Rent.controller";
const retRouter = Router()

retRouter.post("/rentals",createRet);
retRouter.get(" /rentals",getRet);
retRouter.delete("/rentals/:id",deleteRet);
retRouter.patch("/rentals/:id/return",upRet)

export default retRouter;