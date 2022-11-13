import { Router } from "express";
import * as plataforma from "../controller/plataformasController.js";

const plataformaRouter = Router();

plataformaRouter.post('/plataforma', plataforma.insere);

export default plataformaRouter;