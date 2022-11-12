import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { FilmeEntity, Filme } from "../protocols/filme.js";

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

async function insereFilme(body: Filme): Promise<QueryResult<FilmeEntity>>{
    return connection.query(`
        INSERT INTO filmes (nome, genero, "plataformaId") 
        VALUES ($1, $2, $3);`,
        [body.nome, body.genero, body.plataformaId]
    );
}

async function updateFilme(nota:string, id: number): Promise<QueryResult> {
    let avaliacao: string = '';

    if(nota){
        avaliacao = `, nota = '${nota}'`;
    }
    
    return connection.query(`
        UPDATE filmes SET "status" = TRUE ${avaliacao} WHERE id = $1;`,[id]
    );
}

async function filmeById(id: number): Promise<QueryResult> {  
    return connection.query(`SELECT * FROM filmes WHERE id = $1;`,[id]);
}

export { findAll, insereFilme, updateFilme, filmeById };