import * as plataformasRepositores from "../repositories/plataformasRepositores.js";
import { Request, Response } from 'express';
import { Plataforma } from "../protocols/plataforma";
import { plataformaSchema } from "../schemas/plataformaSchema.js";

async function insere(req: Request, res: Response) {
    const body = req.body as Plataforma;

    try{

        const validation = plataformaSchema.validate(body, {abortEarly: false});

        if(validation.error){
            return res.status(400).send({error_message: validation.error.message});
        }

        const plataformaExiste = await plataformasRepositores.findPlataforma(body.nome);

        if(plataformaExiste.rowCount > 0) {
            return res.status(409).send({error_message: 'Plataforma já cadastrada'});
        }

        await plataformasRepositores.inserePlataforma(body);

        res.sendStatus(201);

    }catch(err){
        res.sendStatus(500);
    }   
}

export {
    insere
}