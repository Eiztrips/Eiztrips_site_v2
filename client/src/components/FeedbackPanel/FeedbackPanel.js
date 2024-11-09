import React, { useState } from 'react';
import './FeedbackPanel.scss'; // Подключаем стили

const FeedbackPanel = () => {
  const [feedback, setFeedback] = useState(''); // Состояние для отзыва
  const [feedbacks, setFeedbacks] = useState([]); // Состояние для списка отзывов
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для отслеживания авторизации
  const [phoneNumber, setPhoneNumber] = useState(''); // Состояние для номера телефона
  const [confirmationCode, setConfirmationCode] = useState(''); // Код подтверждения
  const [isPhoneInputVisible, setIsPhoneInputVisible] = useState(false); // Видимость ввода номера телефона

  const handleInputChange = (event) => {
    if (event.target.value.length <= 200) {
      setFeedback(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (feedback.trim()) {
      // Добавляем новый отзыв в начало списка
      setFeedbacks([feedback, ...feedbacks]);
      setFeedback(''); // Очищаем поле ввода после отправки
    }
  };

  const handleLogin = () => {
    // Показываем поле ввода номера телефона при входе через Telegram
    setIsPhoneInputVisible(true);
  };

  const handlePhoneNumberSubmit = async () => {
    // Отправляем запрос на сервер для отправки кода через Telegram
    try {
      const response = await fetch('http://localhost:5000/api/send-confirmation-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      const data = await response.json();
      if (data.message) {
        setConfirmationCode(data.code); // Устанавливаем код подтверждения
        alert('Код подтверждения отправлен!');
      }
    } catch (error) {
      console.error('Ошибка при отправке номера телефона:', error);
    }
  };

  const handleCodeConfirmation = () => {
    // Отправляем запрос на сервер для проверки подтверждения
    alert('Пользователь подтвержден!');
    setIsLoggedIn(true); // Вход успешен
    setIsPhoneInputVisible(false); // Скрываем поле ввода номера
  };

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
              href="https://t.me/eiztripsbot"
              target="_blank"
              rel="noopener noreferrer"
              className="login-button telegram-button"
            >
              <i className="fa-brands fa-telegram" aria-hidden="true"></i>
            </a>
            {isPhoneInputVisible && (
              <div className="phone-input-container">
                <input
                  type="text"
                  placeholder="Введите номер телефона"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="phone-input"
                />
                <button onClick={handlePhoneNumberSubmit} className="submit-phone">
                  Отправить код
                </button>
              </div>
            )}
            {confirmationCode && (
              <div className="confirmation-container">
                <input
                  type="text"
                  placeholder="Введите код подтверждения"
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  value={confirmationCode}
                  className="confirmation-input"
                />
                <button onClick={handleCodeConfirmation} className="submit-code">
                  Подтвердить
                </button>
              </div>
            )}
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
            disabled={!isLoggedIn} // Отзывы можно оставить только после входа
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
