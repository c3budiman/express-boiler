import express from 'express';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();
import * as swaggerDocument from '../swagger-output.json';
import publicRoutes from './Routes/publicRoutes';
import protectedRoutes from './Routes/protectedRoutes';
import bodyParser from 'body-parser';
import passport from 'passport';
import { jwtStrategy } from './passport';

const app = express();

// Middleware
passport.use(jwtStrategy);
app.use(bodyParser.json())

// Routes
// Use the publicRoutes middleware for public routes
app.use('/public', publicRoutes);
app.use('/api', protectedRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes for Experimenting stuff
app.get('/', async (req, res) => {
  try {
    return res.send('Hello, World!');
  } catch (error) {
    res.status(400).json({
      code: "1",
      error
    })
  }
});

// Serve the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});