// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginUser from "./components/LoginUser";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import PasienList from "./components/PasienList";
import AddPasien from "./components/AddPasien";
import EditPasien from "./components/EditPasien";
import PeriksaPasien from "./components/PeriksaPasien";
import Dashboard from "./components/Dashboard";
import DokterList from "./components/DokterList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<AddUser />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/pasien" element={<PasienList />} />
        <Route path="/pasien/add" element={<AddPasien />} />
        <Route path="/pasien/edit/:id" element={<EditPasien />} />
        <Route path="/pasien/periksa/:id" element={<PeriksaPasien />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor" element={<DokterList />} />
        <Route path="*" element={<h1>404 - Halaman tidak ditemukan</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
