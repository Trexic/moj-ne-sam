import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateOrderPage from './pages/CreateOrderPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import UserOrdersPage from './pages/UserOrdersPage';

function App() {
  const [userId, setUserId] = useState(null); // Хранение ID пользователя

  // Функция для установки ID пользователя после входа
  const handleLogin = (id) => {
    setUserId(id);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/user-orders"
          element={<UserOrdersPage userId={userId} />} // Передаем ID пользователя
        />
      </Routes>
    </Router>
  );
}

export default App;