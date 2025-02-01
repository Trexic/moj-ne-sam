import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Orders from '../components/Orders';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Функция для получения списка заказов с сервера
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Функция для удаления заказа
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <Orders orders={orders} onDelete={handleDeleteOrder} />
    </div>
  );
};

export default OrdersPage;