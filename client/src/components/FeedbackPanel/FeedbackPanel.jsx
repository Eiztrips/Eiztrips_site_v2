import React, { useState } from 'react';
import './FeedbackPanel.scss';

const FeedbackPanel = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null); // Store the session ID here

   // Функция для получения значения cookie по его имени
  function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  // Проверка наличия sessionId в cookies
  async function checkSessionId() {
    let sessionId = getCookie('sessionId');
    console.log('sessionid in cookie: ' + sessionId);
    if (!sessionId) {
      // Если ID нет, запрашиваем его у сервера
      const response = await fetch('http://localhost:5000/api/session');
      console.log(response.ok, response.status)
      const data = await response.json();
      sessionId = data.sessionId;

      console.log('Новый sessionId:', sessionId);
    } else {
      console.log('Существующий sessionId из cookies:', sessionId);
    }

  return sessionId;
}

  // Обработка изменения ввода отзыва
  const handleInputChange = (event) => {
    if (event.target.value.length <= 200) {
      setFeedback(event.target.value);
    }
  };

  // Отправка отзыва
  const handleSubmit = (event) => {
    event.preventDefault();
    if (feedback.trim()) {
      setFeedbacks([feedback, ...feedbacks]);
      setFeedback('');
    }
  };

  // Функция для получения sessionId с сервера
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/session?telegramId=12345&nickname=testuser');
      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId); // Сохраняем sessionId в состоянии
        setIsLoggedIn(true); // Устанавливаем состояние, что пользователь вошёл
      } else {
        console.error('Не удалось получить sessionId');
      }
    } catch (error) {
      console.error('Ошибка при запросе sessionId:', error);
    }
  };

  checkSessionId();

  return (
    <div className="feedback-panel">
      <div className="login-wrapper">
        {isLoggedIn ? (
          <button className="login-button" disabled>
            Вы вошли
          </button>
        ) : (
          <>
            <a
              href={sessionId ? `https://t.me/eiztripsbot?start=${sessionId}` : "https://t.me/eiztripsbot"}
              target="_blank"
              rel="noopener noreferrer"
              className="login-button telegram-button"
              onClick={handleLogin} // Получаем sessionId перед переходом
            >
              <i className="fa-brands fa-telegram" aria-hidden="true"></i>
            </a>
          </>
        )}
      </div>

      <div className="feedback-container">
        <h3>Отзывы</h3>
        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            value={feedback}
            onChange={handleInputChange}
            placeholder="Оставьте свой отзыв..."
            maxLength="200"
            rows="4"
            className="feedback-input"
            disabled={!isLoggedIn}
          />
          <button type="submit" className="submit-button" disabled={!isLoggedIn}>
            Отправить
          </button>
        </form>

        <div className="feedback-list">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <p>{feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPanel;
