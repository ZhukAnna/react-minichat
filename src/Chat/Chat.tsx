import React, { FormEvent, useEffect, useState } from 'react';

interface Message {
  sender: string;
  message: string;
  date: string;
}

function Chat() {
  const userName = sessionStorage.getItem('username');
  const [styles, setStyle] = useState('font-bold absolute top-1/2');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: 'John',
            message: 'Hello',
            date: '2022-12-06T12:39:12.255Z',
          },
          {
            sender: userName,
            message: 'Hello, friend!',
            date: '2022-12-06T12:40:56.255Z',
          },
        ];
  });
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.newValue) setHistory(JSON.parse(event.newValue));
    });
    const t = setTimeout(() => {
      setStyle('font-bold text-blue-900 absolute top-0');
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = (evt: FormEvent) => {
    evt.preventDefault();
    const newMsg = {
      sender: userName,
      message,
      date: new Date(),
    };
    setHistory(history.concat(newMsg));
    localStorage.setItem('history', JSON.stringify(history.concat(newMsg)));
    setMessage('');
  };

  return (
    <div className='flex flex-col justify-end h-90 min-w-80 relative gap-6'>
      <div className={styles}>Привет, {userName}!</div>
      {history.map((el: Message, i: number) => {
        return (
          <div
            key={i}
            className={
              'rounded p-4' +
              (el.sender === userName
                ? ' bg-blue-400 self-end'
                : ' bg-blue-200 self-start')
            }>
            <p className='font-bold'>{el.sender}</p>
            <p>{el.message}</p>
            <p>{new Date(el.date).toLocaleTimeString()}</p>
          </div>
        );
      })}
      <form
        className='flex items-center gap-4'
        onSubmit={(e) => sendMessage(e)}>
        <input
          type='text'
          id='message'
          className='form-input px-4 rounded-full'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={3}
          placeholder='Введите сообщение здесь...'
        />
        <button
          type='submit'
          className='w-full bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-full'
          onClick={(e) => sendMessage(e)}>
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Chat;
