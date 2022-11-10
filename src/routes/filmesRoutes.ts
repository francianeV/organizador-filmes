import { Router } from 'express';
import { findAll } from '../controller/filmesController.js';

const router = Router();

router.get('/filmes', findAll);

export default router;