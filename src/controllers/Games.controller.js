import {db} from "../database/db.js"

const creatGamer = async (res, req)=>{
    const {name, image, stockTotal, pricePerDay} = req.body
    try {
        const query = `INSERT INTO games (name, image, stockTotal, pricePerDay) VALUES (${name}, ${image}, ${stockTotal}, ${pricePerDay})`
        await db.query(query)
        res.send({message: "Gamer created successfully"})
    } catch (error) {
        res.statu(500).send({error: error.message})
    }
}
const getGamer = async (res, req)=>{
    try {
        const promise = await db.query("SELECT * FROM games")
        res.status(200).send(promise.rows)
    } catch (error) {
        res.status(500).send(error.message)
}
}

export {creatGamer, getGamer};