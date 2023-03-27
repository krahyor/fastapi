import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const LoginProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    };
    const response = await fetch('http://127.0.0.1:8000/login', requestOptions);

    if (response.ok) {
      const data = await response.json();
      MySwal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Incorrect username or password',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <label>password</label>
        <p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
      <a href="/">Home</a>
      <a href="/registerprofile">register</a>
    </div>
  );
};

export default LoginProfile;
