import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fetchRandomCatGif } from './src/randomCatGif/randomCatGif';
import sessionRouter from './src/auth/session';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


// Эндпоинт для получения случайной гифки с котом
app.get('/api/random-cat-gif', async (req: Request, res: Response) => {
  const gifUrl = await fetchRandomCatGif();

  if (gifUrl) {
    res.json({ url: gifUrl });
  } else {
    res.status(404).json({ error: 'No gif data found' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(sessionRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
