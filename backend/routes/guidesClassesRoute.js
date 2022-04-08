import express from 'express';
import { getClasses , sendClasses  } from '../controllers/guidesClasses.js';

const router = express.Router();

router.get('/guidesclasses', getClasses);
router.post('/guidesclasses', sendClasses);


export default router;