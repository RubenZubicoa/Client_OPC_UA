import { Router } from 'express';

const router = Router();

import { getResults } from '../controller/TestResult.controller';

router.route('/:fecha1/:fecha2')
    .get(getResults)

export default router;