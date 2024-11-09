// src/auth/api.ts
import express, { Request, Response } from 'express';
import { getUserByCode } from './database';

const router = express.Router();

router.get('/auth', (req: Request, res: Response) => {
  const { code } = req.query;

  const user = getUserByCode(code as string);

  if (user) {
    res.status(200).json({ message: 'Авторизация успешна', nickname: user.nickname });
  } else {
    res.status(401).json({ message: 'Неверный код' });
  }
});

export default router;
