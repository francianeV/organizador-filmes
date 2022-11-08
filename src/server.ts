import express from 'express';
import 'dotenv/config'

const server = express();

server.listen(process.env.PORT, ()=> {console.log(`Listening on PORT ${process.env.PORT}`)});