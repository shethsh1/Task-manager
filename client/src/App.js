import React from 'react';
import { Routes, BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import Login from './react.components/Login/Login'
import Signup from './react.components/Login/Signup'
import Home from './react.components/Home/Home'
import { Navigate } from 'react-router-dom';

function App() {

  const curUser = localStorage.getItem("id")



  return (
    <BrowserRouter>
      <Routes>


        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/home/:name" element={<Home />} exact />
        <Route path='*' element={<Navigate to='/login' />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;






