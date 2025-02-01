import React from 'react';
import styled from 'styled-components';

// Стилизованный контейнер для списка заказов
const OrdersContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

// Стилизованный заголовок
const OrdersTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

// Стилизованная таблица заказов
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

// Стилизованная кнопка удаления
const DeleteButton = styled.button`
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const Orders = ({ orders, onDelete }) => {
  return (
    <OrdersContainer>
      <OrdersTitle>Ваши заказы</OrdersTitle>
      {orders.length > 0 ? (
        <OrdersTable>
          <thead>
            <tr>
              <th>Тип</th>
              <th>Количество (комнат)</th>
              <th></th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.type}</td>
                <td>{order.size}</td>
                <td>{order.frequency}</td>
                <td>
                  <DeleteButton onClick={() => onDelete(order.id)}>Delete</DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </OrdersTable>
      ) : (
        <p>Нет доступных заказов</p>
      )}
    </OrdersContainer>
  );
};

export default Orders;