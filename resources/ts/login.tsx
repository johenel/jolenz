import React, { useState } from 'react';
import '../css/homepage.css';

interface LoginProps {
  onSwitchToRegister: () => void;
}

export default function Login({ onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // this is for CSRF token
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': token || '', 
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Login successful!');
        console.log('Logged in user:', data);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Login failed.');
      }
    } catch (error) {
      setMessage('Something went wrong.');
      console.error(error);
    }
  };

  return (
    <div id="form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login"
        />
        <button type="submit" className="login">
          Submit
        </button>
      </form>

      <div>
        Click{' '}
        <button
          onClick={onSwitchToRegister}
          style={{
            color: 'blue',
            textDecoration: 'underline',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          Sign up
        </button>{' '}
        to create an account.
      </div>

      <p>{message}</p>
    </div>
  );
}
