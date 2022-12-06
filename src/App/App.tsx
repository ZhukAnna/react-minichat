import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Chat from '../Chat/Chat';
import Layout from '../Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path={'chat'} element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
