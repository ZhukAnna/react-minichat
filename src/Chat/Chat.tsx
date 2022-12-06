import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

interface Message {
  sender: string;
  message: string;
  date: string;
}

function Chat() {
  const userName = sessionStorage.getItem('username');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: 'Незнакомец',
            message: 'Привет!',
            date: '2022-12-06T12:39:12.255Z',
          },
        ];
  });

  const scrollToBottom = () => {
    const t = setTimeout(() => {
      const chat = document.querySelector('.chat');
      if (chat)
        chat.scrollTo({
          top: chat.scrollHeight,
          behavior: 'smooth',
        });
      clearTimeout(t);
    }, 1200);
  };

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
    window.addEventListener('storage', (event) => {
      if (event.newValue) {
        setHistory(JSON.parse(event.newValue));
        scrollToBottom();
      }
    });
  }, []);

  const sendMessage = (evt: FormEvent) => {
    evt.preventDefault();
    if (message.trim().length) {
      const newMsg = {
        sender: userName,
        message,
        date: new Date(),
      };
      localStorage.setItem('history', JSON.stringify(history.concat(newMsg)));
      setHistory(history.concat(newMsg));
      scrollToBottom();
      setMessage('');
    }
  };

  return (
    <div className='grow'>
      <div className='font-bold text-xl text-blue-900 p-4'>
        Привет, {userName}!
      </div>
      <div className='chat mb-4'>
        <div className='flex flex-col justify-end relative gap-6 pb-6'>
          {history.map((el: Message, i: number) => {
            return (
              <div
                key={i}
                className={
                  'message rounded-lg' +
                  (el.sender === userName
                    ? ' bg-blue-300 self-end rounded-br-none'
                    : ' bg-blue-100 self-start rounded-bl-none')
                }>
                <p className='font-bold'>{el.sender}</p>
                <p>{el.message}</p>
                <p className='text-xs text-right text-gray-500'>
                  {new Date(el.date).toLocaleTimeString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <form
        className='flex flex-wrap sm:flex-nowrap items-center gap-4 pb-3'
        onSubmit={(e) => sendMessage(e)}>
        <input
          type='text'
          id='message'
          className='form-input px-4 rounded-full w-full'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={3}
          placeholder='Введите сообщение здесь...'
        />
        <button
          type='submit'
          className='w-full sm:max-w-xs bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-full'
          onClick={(e) => sendMessage(e)}>
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Chat;
