import React, { useState, useEffect } from 'react';
import './Clock.scss';

const Clock = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const day = now.getDate();
      const month = now.getMonth() + 1; // Месяцы начинаются с 0
      const year = now.getFullYear();

      setTime(`${hours}:${minutes}:${seconds}`);
      setDate(`${day}/${month < 10 ? '0' + month : month}/${year}`);
    }, 1000);

    return () => clearInterval(interval); // Очистить интервал при размонтировании компонента
  }, []);

  return (
    <div className="clock">
      <div className="time">{time}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export default Clock;
