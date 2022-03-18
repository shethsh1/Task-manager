import React from 'react';
import { Routes, BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import Login from './react.components/Login/Login'
import Signup from './react.components/Login/Signup'
import Home from './react.components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/home" element={<Home />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






