import 'reflect-metadata'
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

// Middleware de erro global
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
};

app.use(errorHandler);

AppDataSource.initialize().then(async () => {
  console.log('Database OK');
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  })
});
