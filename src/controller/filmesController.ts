import * as filmesRepositories from '../repositories/filmesRepositories.js';
import { Request, Response } from 'express';
import { Filme } from '../protocols/filme.js';
import { filmeSchema } from '../schemas/filmeSchema.js'; 
import * as plataformasRepositores from "../repositories/plataformasRepositores.js";

async function findAll(req: Request, res: Response){
    try{
        const resultado = await filmesRepositories.findAll();
 
        res.send(resultado.rows);

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

        const novoFilme = await filmesRepositories.insertMovie(body);

        res.send(novoFilme.rows);

    }catch(err){
        res.sendStatus(500);
    }
}

export { findAll,insert };
    