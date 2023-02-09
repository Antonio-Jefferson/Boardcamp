import {db} from "../database/database.js"

const creatGamer = async (req, res)=>{
    const {name, image, stockTotal, pricePerDay} = req.body
    try {
        const result = await db.query(`SELECT * FROM games WHERE name = '${name}'`);

        if(!result) res.status(409).send({message: "Nome do jogo já existe"})

        const query = `INSERT INTO games (name, image, stockTotal, pricePerDay) VALUES ('${name}', '${image}', '${stockTotal}', '${pricePerDay}')`

        await db.query(query)

        res.status(201).send({message: "Gamer created successfully"})
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const getGamer = async (req, res)=>{
    try {
        const promise = await db.query("SELECT * FROM games")
        res.status(200).send(promise.rows)
    } catch (error) {
        res.status(500).send(error.message)
}
}

export {creatGamer, getGamer};