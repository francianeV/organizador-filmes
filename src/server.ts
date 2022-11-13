import express from 'express';
import filmesRouter from './routes/filmesRoutes.js'
import plataformaRouter from './routes/plataformasRoutes.js';
import 'dotenv/config';

const server = express();
server.use(express.json());

server.use(filmesRouter);
server.use(plataformaRouter);

server.listen(process.env.PORT, ()=> {console.log(`Listening on PORT ${process.env.PORT}`)});

