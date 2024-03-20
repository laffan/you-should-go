import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QR from "./../components/QR";
import useStore from '../store'; // Assuming this is the path to your Zustand store

function LoginPage() {
  const [name, setName] = useState('');
  const setUserName = useStore((state) => state.setUserName);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUserName(name); // Update Zustand state with the username
    navigate('/chat'); // Navigate to the chat page
  };

  return (
    <div className='Login'>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Begin!</button>
      </form>
    </div>
  );
}

export default LoginPage;
