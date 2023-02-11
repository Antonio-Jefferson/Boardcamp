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
const getCustomerId = async(req, res)=>{
    const {id} = req.params
    try {
        const promise = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])
        if(!promise.rowCount > 0) return res.status(404).send()
        res.status(200).send(promise.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const upCustomers = async (req, res)=>{
    const {name, phone, cpf, birthday} = req.body
    const {id} = req.params
    try {
        const result = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])
        if(result.rowCount > 0) return res.status(409).send()

        await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, birthday, id])
        res.status(200).send()

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export {createCustomers, getCustomers, upCustomers,getCustomerId}