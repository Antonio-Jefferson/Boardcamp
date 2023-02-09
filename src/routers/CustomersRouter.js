import { Router } from "express";
import { createCustomers, upCustomers, getCustomers } from "../controllers/Customers.controller.js";
import { validatSchemas } from "../middlewares/validationSchema.js";
import { validationCustomer } from "../schemas/customersSchema.js";
const customersRouter = Router();

customersRouter.post("/customers",validatSchemas(validationCustomer),createCustomers);
customersRouter.get("/customers",getCustomers);
customersRouter.get("/customers/:id",getCustomers)
customersRouter.patch("/customers/:id",upCustomers)


export default customersRouter;