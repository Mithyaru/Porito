import React, { useState } from 'react';
import axios from 'axios';
import '../Login/login.css'
import porito from '../../Assets/porito.png'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className='containerLogin'>
      <h2 className='titleLogin'>Login</h2>
      <form onSubmit={handleSubmit} className='formLogin'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          className='loginInput'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className='loginInput'
        />
        <button type="submit" className='buttonLogin'>
          <img alt='' src={porito} width='50'></img>
        </button>
      </form>
    </div>
  );
};

export default Login;