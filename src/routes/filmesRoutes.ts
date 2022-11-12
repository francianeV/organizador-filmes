import { Router } from 'express';
import { findAll, insert } from '../controller/filmesController.js';

const router = Router();

router.get('/filmes', findAll);
router.post('/filmes', insert);

export default router;