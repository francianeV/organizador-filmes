import { QueryResult } from "pg";
import { connection } from "../database/db.js";

async function findId(id: number): Promise<QueryResult>{
    return connection.query(`SELECT * FROM plataforma WHERE id = $1;`,[id]);
}

export { findId };