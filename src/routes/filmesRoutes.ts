import { Router } from 'express';
import { findAll, insert, update } from '../controller/filmesController.js';

const router = Router();

router.get('/filmes', findAll);
router.post('/filmes', insert);
router.patch('/filmes/:id/assistido', update);

export default router;