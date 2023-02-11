import JOI from "joi";

export const retSchemas = JOI.object({
  customerId: JOI.number().integer().required(),
  gameId: JOI.number().integer().required(),
  daysRented: JOI.number().integer().required(),
});

