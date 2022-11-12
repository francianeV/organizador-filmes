import joi from 'joi';

export const filmeSchema = joi.object({
    nome: joi.string().min(2).required(),
    genero: joi.string().min(2).required(),
    plataformaId: joi.number().required()
});

