import { Router } from "express";
import { createCustomers, upCustomers, getCustomers, getCustomerId } from "../controllers/Customers.controller.js";
import { validatSchemas } from "../middlewares/validationSchema.js";
import { validationCustomer } from "../schemas/customersSchema.js";
const customersRouter = Router();

customersRouter.post("/customers",validatSchemas(validationCustomer),createCustomers);
customersRouter.get("/customers",getCustomers);
customersRouter.get("/customers/:id",getCustomerId)
customersRouter.put("/customers/:id",validatSchemas(validationCustomer),upCustomers)


export default customersRouter;