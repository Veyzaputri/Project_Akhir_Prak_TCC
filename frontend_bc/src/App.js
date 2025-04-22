// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginUser from "./components/LoginUser";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />           
        <Route path="/register" element={<AddUser />} />     
        <Route path="/users" element={<UserList />} />       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
