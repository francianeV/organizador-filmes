import * as filmesRepositories from '../repositories/filmesRepositories.js';
import { Request, Response } from 'express';

async function findAll(req: Request, res: Response){
    try{
        const resultado = await filmesRepositories.findAll();
 
        res.send(resultado.rows);

    }catch(err){
        console.log(err);
        res.send(err);
    }
}

export { findAll };
    