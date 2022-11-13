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
        res.sendStatus(500);
    }
}

async function filtraFimes(req: Request, res: Response){ 
    const assistido:string = req.params.filtro;

    try{
        const resultado = await filmesRepositories.filtraFilmes(assistido);
        
        res.status(200).send(resultado.rows)

    }catch(err){
        console.log(err)
        res.sendStatus(500);
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

        res.sendStatus(201);

    }catch(err){
        res.sendStatus(500);
    }
}

async function update (req: Request, res: Response){
    const id: number = Number(req.params.id);
    const nota: string = req.body.nota;

    if(Number.isNaN(id)){
        return res.status(400).send({error_message: 'id inválido'})
    }

    try{

        const filmeExistente = await filmesRepositories.filmeById(Number(id));

        if(filmeExistente.rowCount === 0){
            return res.status(404).send({error_message: 'filme com id não existente'});
        }

        await filmesRepositories.updateFilme(nota, Number(id));

        res.sendStatus(204);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function deletar (req: Request, res: Response) {
    const id: number = Number(req.params.id);

    if(Number.isNaN(id)){
        return res.status(400).send({error_message: 'id inválido'})
    }

    try{
        const filmeExiste = await filmesRepositories.filmeById(id);

        if(filmeExiste.rowCount === 0){
            return res.status(404).send({error_message: "filme inexistente"});
        }

        await filmesRepositories.deletarFilme(id);

        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function qtdFilmesPorGenero(req: Request, res: Response){
    const id: number = Number(req.query.id);

    try{
        if(id){
            const plataformaExiste = await plataformasRepositores.findId(id);

            if(plataformaExiste.rowCount === 0){
                return res.status(404).send({error_message: 'Plataforma inexistente'})
            }
        }

        const listaFilmes = await filmesRepositories.filmePorGenero(id);

        res.status(200).send(listaFilmes.rows);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export { 
    findAll, 
    insert, 
    update, 
    deletar, 
    qtdFilmesPorGenero,
    filtraFimes 
};
    