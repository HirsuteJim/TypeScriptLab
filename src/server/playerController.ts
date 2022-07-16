import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { Player, Scoreboard } from '../types';


export const playerController = {
  getScores: (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  console.log('🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 9 | req.body', req.body);
    const scoreboard = fs.readFile(
      path.resolve(__dirname, './db.json'),
      'utf8',
      (err, data) => {
        if (err) {
          console.log(
            '🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 12 | scoreboard | err',
            err
          );
          return;
        }
        console.log(
          '🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 16 | scoreboard | data',
          data
        );

        res.locals.scores = JSON.parse(data);
        return next();
      }
    );
  },

  updateScores: (req: Request, res: Response, next: NextFunction) => {
  console.log('🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 36 | req.body', req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    console.log(
      '🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 4 | console.log | res.locals.scores',
      res.locals.scores
    );
    
    const {winner} = req.body; // { winner: 'O' or 'X' }
    console.log(
      '🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 47 | winner',
      winner
      );
    console.log(
      '🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 51 | req.body',
      req.body
      );
      
      winner === 'X' ? res.locals.scores.X++ : res.locals.scores.O++;
      console.log(
        '🔴🟠🟡🟢🔵🟣 | file: playerController.ts | line 45 | console.log | res.locals.scores',
        res.locals.scores
      );

      return next();
    },
  };