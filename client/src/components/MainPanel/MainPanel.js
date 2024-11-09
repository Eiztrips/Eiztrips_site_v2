import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainPanel.scss';

const MainPanel = () => {
  const [gifUrl, setGifUrl] = useState('');  // Для хранения URL гифки
  const [loading, setLoading] = useState(true); // Состояние загрузки

  // Функция для получения случайной гифки с сервера
  const fetchRandomCatGif = async () => {
    try {
      console.log('Fetching random cat gif from server...');
      const response = await axios.get('http://localhost:5000/api/random-cat-gif'); // Запрашиваем гифку с вашего сервера

      if (response.data.url) {
        setGifUrl(response.data.url); // Устанавливаем URL гифки
        setLoading(false); // Завершаем загрузку
      } else {
        setLoading(false); // Ошибка, нет данных
        console.log('No gif data found in the response.');
      }
    } catch (error) {
      console.error('Error fetching random cat gif:', error);
      setLoading(false); // Завершаем загрузку с ошибкой
    }
  };

  // Загружаем первую гифку при монтировании компонента
  useEffect(() => {
    fetchRandomCatGif();

    // Обновляем гифку каждые 10 секунд
    const intervalId = setInterval(() => {
      fetchRandomCatGif();
    }, 1000*60);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main-container">
      <div className="center-panel">
        {loading ? (
          <p>Загрузка гифки...</p>
        ) : gifUrl ? (
          <div className="gif-container">
            <img src={gifUrl} alt="Random Cat" className="gif" />
          </div>
        ) : (
          <div className="gif-container">
            <img src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXVyMTM5M25rYWFhbmJiaXFuZnphN2t1dGpzMDE4OGZqZzhyZWxvMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lJNoBCvQYp7nq/giphy.gif"} alt="Random Cat" className="gif" />
          </div>
        )}
        <div className="skills">
          <h2>About me</h2>
          <p>
            Часть модерации проекта Subshield, модератор Twitch каналов: 
            liztochek, Millka_Rusch. 
            Использую: Python, HTML, CSS, SCSS, JavaScript, React.js, D3.js, Node.js, 
            TypeScript, Java, SQLite, MongoDB. Программист с опытом, студент 1 курса, 
            прикладная информатика. Время от времени решаю задачи, потом задаюсь вопросом, зачем я это сделал.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
