import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import gamerRouter from "./routers/GamersRouter.js"
import retRouter from "./routers/RetRouter.js"
import customersRouter from "./routers/CustomersRouter.js"
dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

server.use(gamerRouter)
server.use(retRouter)
server.use(customersRouter)

const port = process.env.PORT || 5000
server.listen(port, ()=> console.log(`running on the door ${port}`))