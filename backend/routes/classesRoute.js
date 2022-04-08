import express from 'express';
import { getClasses , sendClasses  } from '../controllers/classes.js';

const router = express.Router();

router.get('/schedulerclasses', getClasses);
router.post('/schedulerclasses', sendClasses);

export default router;