import JOI from "joi"

export const validationCustomer = JOI.object({
    name:JOI.string().required(), 
    phone:JOI.string().min(10).max(11).required(), 
    cpf:JOI.string().min(11).max(11).regex(/^\d+$/).required(), 
    birthday: JOI.string().pattern(/^\d{4}\-\d{2}\-\d{2}$/).required()
})

