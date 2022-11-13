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

async function deletar (req: Request, res: Response) {
    const id: number = Number(req.params.id);

    if(Number.isNaN(id)){
        return res.status(400).send({error_message: 'id inválido'})
    }

    try{
        const PlataformaExiste = await plataformasRepositores.findId(id);

        if(PlataformaExiste.rowCount === 0){
            return res.status(404).send({error_message: "plataforma inexistente"});
        }

        await plataformasRepositores.deletarPlataforma(id);

        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export {
    insere,
    deletar
}