import { Router } from "express";
import { creatGamer,getGamer } from "../controllers/Games.controller.js";
import { validatSchemas } from "../middlewares/validationSchema.js";
import { validationGamer } from "../schemas/gamerSchema.js";
const gamerRouter = Router();

gamerRouter.post("/games",validatSchemas(validationGamer), creatGamer)
gamerRouter.get("/games", getGamer)

export default gamerRouter;