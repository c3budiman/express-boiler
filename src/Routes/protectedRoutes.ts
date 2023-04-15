import { Router } from 'express';
import passport from 'passport';
import { checkRole } from '../Middleware/checkRole';
import { checkAuth } from '../Middleware/checkAuth';

const router = Router();

// Add passport middleware for JWT authentication
router.use(passport.authenticate('jwt', { session: false }));

router.get('/get-session', checkAuth(), (req, res) => {
    /* #swagger.security = [{
           "bearerAuth": []
    }] */
    res.json(req.user);
});

router.get('/onlyadmin', checkRole("admin"), (req, res) => {
    /* #swagger.security = [{
           "bearerAuth": []
    }] */
    res.json(req.user);
});

export default router;