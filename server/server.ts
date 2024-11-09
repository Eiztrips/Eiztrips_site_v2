import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { fetchRandomCatGif } from './src/randomCatGif/randomCatGif';  // Импортируем функцию для получения гифки
import bodyParser from 'body-parser';
import apiRouter from './src/auth/api';
import bot from './src/auth/telegram'

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());  // Для разрешения CORS, если фронтенд и бэкенд на разных портах

// Эндпоинт для получения случайной гифки с котом
app.get('/api/random-cat-gif', async (req: Request, res: Response) => {
  const gifUrl = await fetchRandomCatGif();

  if (gifUrl) {
    res.json({ url: gifUrl });
  } else {
    res.status(404).json({ error: 'No gif data found' });
  }
});

app.get('/session', (req, res) => {
  const sessionId = uuidv4();
  // Сохраните sessionId в базе данных, если нужно
  res.cookie('session_id', sessionId, { httpOnly: true, secure: true }); // Сохранение в куках
  res.json({ sessionId });
});

app.use('/api', apiRouter);

bot.launch().then(() => {
  console.log('Telegram has connected');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
