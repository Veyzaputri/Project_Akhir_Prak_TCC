import React, { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");


  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/login', {
        username,
        password
      },{withCredentials: true});
      localStorage.setItem("accessToken", response.data.accessToken);

      // Redirect ke dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login gagal. Silakan periksa username/password.");
    }
  };

  const goToSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title has-text-centered has-text-info">Login</h1>
          <form onSubmit={loginUser}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input 
                  type="text" 
                  className="input is-medium is-rounded" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username" 
                  required 
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input 
                  type="password" 
                  className="input is-medium is-rounded" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter password" 
                  required 
                />
              </div>
            </div>

            <div className="field has-text-centered">
              <button type="submit" className="button is-link is-medium is-rounded px-5">
                Login
              </button>
            </div>
          </form>
          <div className="has-text-centered mt-3">
            <p>Belum punya akun?</p>
            <button 
              onClick={goToSignUp}
              className="button is-light is-rounded mt-2"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
