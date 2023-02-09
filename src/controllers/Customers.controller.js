import { db } from "../database/database.js"

const createCustomers = async (req, res)=>{
    const {name, phone, cpf, birthday} = req.body
    try {
        const result = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])
    
        if(result.rowCount > 0) return res.status(409).send({ message: "cpf já existente" })

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday])
        res.status(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}
const getCustomers = async (req, res)=>{
    try {
        const promise = await db.query("SELECT * FROM customers")
        res.status(200).send(promise.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const upCustomers = (req, res)=>{
    
}

export {createCustomers, getCustomers, upCustomers}