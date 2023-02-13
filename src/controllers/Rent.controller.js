import { db } from "../database/database.js"
import dayjs from "dayjs"

const createRet = async (req, res) => {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD HH:mm");
    const returnDate = null;
    const delayFee = null;


    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
        const isAvailable = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
        const stock = await db.query(`SELECT games."stockTotal" FROM games WHERE id=$1`, [gameId]);
        const isRentals = await db.query('SELECT * FROM rentals WHERE "gameId" = $1', [gameId])

        if (customer.rows.length === 0 || isAvailable.rows.length === 0) return res.sendStatus(400)

        if (stock.rows[0].stockTotal <= isRentals.rowCount) return res.sendStatus(400)

        const pricePerDay = await db.query(`SELECT games."pricePerDay" FROM games WHERE id=$1`, [gameId]);
        const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented;

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee,]);
        res.status(201).send("aluguel criado");

    } catch (error) {
        res.satus(500);
    }
}
const getRet = async (req, res) => {
    try {
        const promise = await db.query(`SELECT rentals.*, customers.id AS "customer.id", customers.name AS "customer.name", games.id AS "game.id", games.name AS "game.name" FROM customers JOIN rentals ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId"`);
        const result = promise?.rows.map((item) => ({
            id: item.id,
            customerId: item.customerId,
            gameId: item.gameId,
            rentDate: item.rentDate,
            daysRented: item.daysRented,
            returnDate: item.returnDate,
            originalPrice: item.originalPrice,
            delayFee: item.delayFee,
            customer: {
                id: item["customer.id"],
                name: item["customer.name"]
            },
            game: {
                id: item["game.id"],
                name: item["game.name"]
            }
        }))
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}
const upRet = async (req, res) => {
    const { id } = req.params;

    try {
        const isAvailable = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

        if (isAvailable.rowCount === 0){
            return res.status(404).send("error")
        } 

        const result = await db.query(`SELECT rentals.*, games."pricePerDay" AS "pricePerDay" FROM rentals JOIN games ON games.id=rentals."gameId" WHERE rentals.id=$1`, [id]);
        const rental = result.rows[0];

        if (rental.returnDate){
            return res.status(400).send("error")
        }
    
        const rentalDueDate = dayjs(rental.dueDate);
        const returnDate = dayjs(req.body.returnDate);
        const delayDays = returnDate.diff(rentalDueDate, "days");
        const delayFee = delayDays > 0 ? parseInt(delayDays) * rental.pricePerDay : 0;

        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`, [returnDate.toISOString(), delayFee, id]);

        res.status(200)
    } catch (error) {
        res.status(500).send(error.message);
    }

}
const deleteRet = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(`SELECT * FFROM rentals id = $1`, [id])
        if (result.rowCount === 0) return res.status(404)

        const res = await db.query('SELECT * FROM rentals WHERE id = $1 AND "returnDate" IS NOT NULL', [id])
        if (!res.rowCount > 0) return res.sendStatus(400);

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id]);
        res.status(200);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { createRet, upRet, deleteRet, getRet };