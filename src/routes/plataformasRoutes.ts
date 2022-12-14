import { Router } from "express";
import * as plataforma from "../controller/plataformasController.js";

const plataformaRouter = Router();

plataformaRouter.post('/plataforma', plataforma.insere);
plataformaRouter.delete('/plataforma/:id', plataforma.deletar);
plataformaRouter.get('/plataformas', plataforma.listarTudo);

export default plataformaRouter;