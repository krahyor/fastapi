import React, { useState } from 'react';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

interface User {
  username: string;
  password: string;
}

const RegisterProfile = () => {
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<User>('http://127.0.0.1:8000/register', user);
      console.log(response.data);
      MySwal.fire({
        icon: 'success',
        title: 'register success',
        showConfirmButton: false,
        timer: 1500,
      });
      // TODO: redirect to login page
    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: 'error',
        title: 'You can not register ',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Register</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterProfile;
