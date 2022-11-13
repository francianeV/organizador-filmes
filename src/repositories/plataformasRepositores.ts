import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { Plataforma, PlataformaEntity } from "../protocols/plataforma.js";

async function findId(id: number): Promise<QueryResult>{
    return connection.query(`SELECT * FROM plataforma WHERE id = $1;`,[id]);
}

async function findPlataforma(nome: string): Promise<QueryResult>{
    return connection.query(`SELECT * FROM plataforma WHERE nome = $1;`,[nome]);
}

async function inserePlataforma(body: Plataforma): Promise<QueryResult<PlataformaEntity>>{
    return connection.query(`
        INSERT INTO plataforma (nome) VALUES ($1);`,[body.nome]
    );
}

async function deletarPlataforma(id: number): Promise<QueryResult>{
    return connection.query(`DELETE FROM plataforma WHERE id = $1;`,[id]);
}

async function listaTudo(): Promise<QueryResult<PlataformaEntity>> {
    return connection.query(`SELECT id, nome AS plataforma FROM plataforma`);
}

export { 
    findId, 
    findPlataforma,
    inserePlataforma,
    deletarPlataforma,
    listaTudo, 
};