import joi from "joi";

export const plataformaSchema = joi.object({
    nome: joi.string().min(2).required()
});
