import { Router } from 'express';
import * as filmes from '../controller/filmesController.js';

const router = Router();

router.get('/filmes', filmes.findAll);
router.post('/filme', filmes.insert);
router.patch('/filme/:id/assistido', filmes.update);
router.delete('/filme/:id', filmes.deletar);
router.get('/filmes/genero', filmes.qtdFilmesPorGenero);
router.get('/filmes/:filtro', filmes.filtraFimes);

export default router;