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
        JOIN plataforma ON filmes."plataformaId" = plataforma.id ;
    `);
}

async function filtraFilmes(assistido: string): Promise<QueryResult> {
    let escolha: string = '';
    let nota: string = '';
    
    if(assistido){
        escolha = `WHERE status = $1;`
    }

    if(assistido === 'true'){
        nota = `, nota AS comentarios`
    }

    console.log(escolha)
    return connection.query(`
        SELECT 
            filmes.nome AS "Filme", 
            genero, 
            status AS "Assistido",
            plataforma.nome AS "Plataforma" ${nota}
        FROM filmes  
        JOIN plataforma ON filmes."plataformaId" = plataforma.id 
        ${escolha}
    `,[assistido]);
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

async function deletarFilme(id: number): Promise<QueryResult>{
    return connection.query(`DELETE FROM filmes WHERE id = $1;`,[id]);
}

async function filmePorGenero(id: number): Promise<QueryResult> {
    let genero: string = '';
    
    if(id){
        genero = `WHERE "plataformaId" = ${id}`
    }
    return connection.query(`
        SELECT COUNT(nome) as "qtdFilmes", genero FROM filmes ${genero}
         GROUP BY genero; 
    `);
}

export { 
    findAll, 
    insereFilme, 
    updateFilme, 
    filmeById, 
    deletarFilme,
    filmePorGenero,
    filtraFilmes 
};