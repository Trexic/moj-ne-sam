// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.jpg'; // Корректный импорт изображения


const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
`;

const HomePage = () => {
  return (
    <Container>
      <Title>Добро пожаловать в Мой Не Сам!</Title>
      <Description>Ваш портал клиниговых услуг.</Description>
    </Container>
  );
};

export default HomePage;