import express from 'express';
import filmesRouter from './routes/filmesRoutes.js'
import 'dotenv/config';

const server = express();
server.use(express.json());

server.use(filmesRouter);

server.listen(process.env.PORT, ()=> {console.log(`Listening on PORT ${process.env.PORT}`)});

