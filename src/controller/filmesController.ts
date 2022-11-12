import * as filmesRepositories from '../repositories/filmesRepositories.js';
import { Request, Response } from 'express';
import { Filme } from '../protocols/filme.js';
import { filmeSchema } from '../schemas/filmeSchema.js'; 
import * as plataformasRepositores from "../repositories/plataformasRepositores.js";

async function findAll(req: Request, res: Response){
    try{
        const resultado = await filmesRepositories.findAll();
 
        res.status(200).send(resultado.rows);

    }catch(err){
        console.log(err);
        res.send(err);
    }
}

async function insert(req: Request, res: Response){
    const body = req.body as Filme;

    try{

        const validation = filmeSchema.validate(body, {abortEarly: false});

        if(validation.error){
            return res.status(400).send({error_message: validation.error.message});
        }

        const plataformaExiste = await plataformasRepositores.findId(body.plataformaId);

        if(plataformaExiste.rowCount === 0) {
            return res.status(404).send({error_message: 'Id da plataforma não existe'});
        }

        await filmesRepositories.insereFilme(body);

        res.send(201);

    }catch(err){
        res.sendStatus(500);
    }
}

async function update (req: Request, res: Response) {
    const id = req.params;
    const nota = req.body;

    if(Number.isNaN(Number(id.id))){
        return res.status(400).send({error_message: 'id inválido'})
    }

    try{

        const filmeExistente = await filmesRepositories.filmeById(Number(id.id));

        if(filmeExistente.rowCount === 0){
            return res.status(404).send({error_message: 'filme com id não existente'});
        }

        await filmesRepositories.updateFilme(nota.nota, Number(id.id));

        res.sendStatus(204);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export { findAll, insert, update};
    