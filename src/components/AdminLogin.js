import React, { useState } from 'react';
import styled from 'styled-components';

const AdminLoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const AdminLoginTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (credentials.login === 'adminka' && credentials.password === 'password') {
      onLogin(true);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <AdminLoginContainer>
      <AdminLoginTitle>Админ-панель</AdminLoginTitle>
      <label>
        Логин:
        <StyledInput type="text" name="login" value={credentials.login} onChange={handleInputChange} />
      </label>
      <label>
        Пароль:
        <StyledInput type="password" name="password" value={credentials.password} onChange={handleInputChange} />
      </label>
      <SubmitButton onClick={handleSubmit}>Войти</SubmitButton>
    </AdminLoginContainer>
  );
};

export default AdminLogin; // Убедитесь, что компонент правильно экспортируется