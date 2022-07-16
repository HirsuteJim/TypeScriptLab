import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { playerController } from './playerController';
import {ServerError} from './../types';

const app = express();

app.use(express.json());

app.get('/api', playerController.getScores, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.json(res.locals.scores);
});
app.post(
  '/api',
  playerController.getScores,
  playerController.updateScores,
  (req, res, next) => res.json(res.locals.scores)
);

app.use(
  '/',
  (err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr: ServerError = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: {err: 'An error occurred'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(3000, () => console.log('server is listening on port 3000'));