// server/src/session.ts
import express, { Request, Response } from 'express';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import path from 'path';

const router = express.Router();
const app = express();
app.use(cookieParser());

// Путь к JSON-файлу для хранения ID сессий
const sessionsFilePath = path.join(__dirname, 'sessions.json');


// Определяем интерфейс для структуры сессий
interface Sessions {
  [key: string]: { TelegramId: string };
}

function generateNumericId(length: number = 12): string {
    let numericId = '';
    
    for (let i = 0; i < length; i++) {
      numericId += Math.floor(Math.random() * 10); // Добавляем случайное число от 0 до 9
    }
  
    return numericId;
  }

// Функция для записи сессии в файл
function saveSessionToFile(sessionId: string) {
  let sessions: Sessions = {};
  try {
    if (fs.existsSync(sessionsFilePath)) {
      const fileData = fs.readFileSync(sessionsFilePath, 'utf-8');
      console.log(fileData)
      // Проверяем, не пустой ли файл
      if (fileData.trim().length > 0) {
        sessions = JSON.parse(fileData) as Sessions;
      }
    }
  } catch (error) {
    console.error('Ошибка при чтении или парсинге sessions.json:', error);
  }

  sessions[sessionId] = { TelegramId: "None" };
  
  try {
    fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2));
  } catch (error) {
    console.error('Ошибка при записи в sessions.json:', error);
  }
}

// Маршрут для получения или создания sessionId и установки его в cookies
router.get('/api/session', (req: Request, res: Response) => {
  let sessionId = req.cookies.sessionId;
  console.log('Getting or creating sessionId:', sessionId);
  // Проверка, есть ли уже sessionId в cookies
  if (!sessionId) {
    sessionId = generateNumericId(); // Генерация уникального ID сессии
    saveSessionToFile(sessionId); // Сохранение sessionId в JSON-файл
    
    // Установка sessionId в cookies с max-age на 1 день
    res.cookie('sessionId', sessionId, { maxAge: 86400000 * 360, httpOnly: true });
  }

  res.json({ sessionId });
});

export default router;
