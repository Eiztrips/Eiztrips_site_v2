import { Telegraf } from 'telegraf';
import { v4 as uuidv4 } from 'uuid';
import { addUserToDatabase } from './database';

const bot = new Telegraf('5318132379:AAGR2qU6wPeOTDTAAtcVILyS5PWSzn99glQ');

// Получение ID сессии из сервера
async function getSessionId() {
  const response = await fetch('/session');
  const data = await response.json();
  return data.sessionId;
}

// Обработка клика на кнопке
async function handleAuthButtonClick() {
  const sessionId = await getSessionId();
  const botUsername = 'eiztripsbot'; // Замените на имя вашего бота
  const authLink = `https://t.me/${botUsername}?start=${sessionId}`;
  
  // Перенаправление в Telegram
  window.location.href = authLink;
}


export default bot;
