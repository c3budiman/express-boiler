import { Router } from 'express';
import { LoginUser, RegisterUser } from '../Controllers/UserC';

const router = Router();

router.post('/v1/register', RegisterUser);
router.post('/v1/login', LoginUser);

export default router;