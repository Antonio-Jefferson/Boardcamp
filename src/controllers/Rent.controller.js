import { db } from "../database/database.js"
import dayjs from "dayjs"

const createRet = async (res, req) => {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD HH:mm");
    const returnDate = null;
    const delayFee = null;

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id=$1`,[customerId]);
        const isAvailable = await connection.query( `SELECT * FROM rentals WHERE "gameId"=$1`,[gameId]);
        const stock = await connection.query(`SELECT games."stockTotal" FROM games WHERE id=$1`,[gameId]);

        if(!customer.rows.length > 0 && !isAvailable.rows.length > 0) return res.sendStatus(400)
        if(stock === 0) return res.sendStatus(400)

        const pricePerDay = await connection.query(`SELECT games."pricePerDay" FROM games WHERE id=$1`, [gameId]);
        const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented;

        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                customerId,
                gameId,
                rentDate,
                daysRented,
                returnDate,
                originalPrice,
                delayFee,
            ]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

const getRet = (res, req) => { }
const upRet = (res, req) => { }
const deleteRet = (res, req) => { }


export { createRet, upRet, deleteRet, getRet };