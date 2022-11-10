import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { FilmeEntity, Filme } from "../protocols/filme.js"

async function findAll(): Promise<QueryResult<FilmeEntity>> {
    return connection.query(`
        SELECT 
            filmes.id, 
            filmes.nome AS filme,
            filmes.genero,
            plataforma.nome AS plataforma,
            filmes.status AS assistido
        FROM filmes 
        JOIN plataforma ON filmes."plataformaId" = plataforma.id;
    `);
}

export { findAll };