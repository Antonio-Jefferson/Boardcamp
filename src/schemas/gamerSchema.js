import JOI from "joi"

export const validationGamer = JOI.object({
    name:JOI.string().required(),
    image:JOI.string().required(),
    stockTotal:JOI.number().min(1).required(),
    pricePerDay:JOI.number().min(1).required(),
})