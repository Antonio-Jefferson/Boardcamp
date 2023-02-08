import { Router } from "express";
import { creatGamer,getGamer } from "../controllers/Games.controller";

const gamerRouter = Router();

gamerRouter.post("/games",creatGamer)
gamerRouter.get("/games",getGamer)

export default gamerRouter;