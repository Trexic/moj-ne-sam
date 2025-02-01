import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Стилизованный контейнер для формы
const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

// Стилизованный заголовок
const RegisterTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

// Стилизованный блок формы
const FormBlock = styled.div`
  margin-bottom: 15px;
`;

// Стилизованный метка (label)
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

// Стилизованный поле ввода (input)
const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

// Стилизованный блок ошибки
const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

// Стилизованный кнопка
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

const Register = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Здесь можно отправить данные на сервер через сервис
  };

  return (
    <RegisterContainer>
      <RegisterTitle>Зарегистрироваться</RegisterTitle>
      <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <FormBlock>
              <Label>Почта</Label>
              <StyledField name="email" type="email" />
              <Error>{errors.email && touched.email ? errors.email : null}</Error>
            </FormBlock>
            <FormBlock>
              <Label>Пароль</Label>
              <StyledField name="password" type="password" />
              <Error>{errors.password && touched.password ? errors.password : null}</Error>
            </FormBlock>
            <SubmitButton type="submit">Зарегистрироваться</SubmitButton>
          </Form>
        )}
      </Formik>
    </RegisterContainer>
  );
};

export default Register;