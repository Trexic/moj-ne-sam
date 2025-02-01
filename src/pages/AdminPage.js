import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AdminLogin from '../components/AdminLogin'; // Добавьте эту строку

const AdminContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const AdminTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
`;

const StatusSelect = styled.select`
  padding: 5px;
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Получение списка заказов с сервера
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (isAdminLoggedIn) {
      fetchOrders();
    }
  }, [isAdminLoggedIn]);

  // Обновление статуса заказа
  const updateOrderStatus = async (orderId, status, reason = null) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status, reason });
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status, reason } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Отображение формы авторизации или таблицы заказов
  if (!isAdminLoggedIn) {
    return (
      <AdminLogin
        onLogin={(isLoggedIn) => {
          if (isLoggedIn) {
            setIsAdminLoggedIn(true);
          }
        }}
      />
    );
  }

  return (
    <AdminContainer>
      <AdminTitle>Админ-панель</AdminTitle>
      <OrdersTable>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Услуга</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.fullName}</td>
              <td>{order.phone}</td>
              <td>{order.serviceType}</td>
              <td>{order.status}</td>
              <td>
                <StatusSelect
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (newStatus === 'отменено') {
                      const reason = prompt('Введите причину отмены:');
                      updateOrderStatus(order.id, newStatus, reason);
                    } else {
                      updateOrderStatus(order.id, newStatus);
                    }
                  }}
                >
                  <option value="">Выберите статус</option>
                  <option value="в работе">В работе</option>
                  <option value="выполнено">Выполнено</option>
                  <option value="отменено">Отменено</option>
                </StatusSelect>
                <SubmitButton onClick={() => updateOrderStatus(order.id, 'отменено')}>Отменить</SubmitButton>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
    </AdminContainer>
  );
};

export default AdminPage;