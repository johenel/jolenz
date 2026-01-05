import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-TOKEN": token || "",
        },
        body: JSON.stringify({ name, email, password, password_confirmation: password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Register successful!");
        console.log(data);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Register failed.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div id='form_reg'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='register'
          type="text"
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='register'
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='register'
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='register' id='submit_btn' type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
