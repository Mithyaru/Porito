import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'
import porito from '../../Assets/porito.png'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {

    }
  };

  return (
    <div className='containerRegister'>
      <h2 className='titleRegister'>Registrar</h2>
      <form onSubmit={handleSubmit} className='formRegister'>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className='inputRegister'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='inputRegister'
        />
        <button type="submit" className='buttonRegister'><img alt='' src={porito} width='50'></img></button>
      </form>
    </div>
  );
};

export default Register;