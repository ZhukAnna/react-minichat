import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [userName, setValue] = useState('');
  const navigate = useNavigate();
  const startChat = () => {
    sessionStorage.setItem('username', userName);
    navigate('/chat');
  };

  return (
    <div className='flex flex-col items-center gap-6'>
      <h1 className='font-bold'>Добро пожаловать в чат!</h1>
      <form
        className='flex flex-col items-center gap-4'
        onSubmit={() => startChat()}>
        <label htmlFor='username'>Как вас зовут?</label>
        <input
          type='text'
          id='username'
          className='form-input px-4 rounded-full'
          value={userName}
          onChange={(e) => setValue(e.target.value)}
          minLength={3}
        />
        <button
          type='submit'
          className='w-full bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-full'
          onClick={() => startChat()}>
          Начать общение
        </button>
      </form>
    </div>
  );
}

export default Welcome;
