import JOI from "joi"

export const validationCustomer = JOI.object({
    name:JOI.string().required(), 
    phone:JOI.string().min(10).max(11).required(), 
    cpf:JOI.string().min(11).max(11).required(), 
    birthday:JOI.string().required()
})

