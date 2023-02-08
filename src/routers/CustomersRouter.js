import { Router } from "express";
import { createCustomers, upCustomers, getCustomers } from "../controllers/Customers.controller.js";
const customersRouter = Router();

customersRouter.post("/customers",createCustomers);
customersRouter.get("/customers",getCustomers);
customersRouter.get("/customers/:id",getCustomers)
customersRouter.patch("/customers/:id",upCustomers)


export default customersRouter;