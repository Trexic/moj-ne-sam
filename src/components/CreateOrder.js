import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Стилизованный контейнер для формы
const CreateOrderContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

// Стилизованный заголовок
const CreateOrderTitle = styled.h2`
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

// Стилизованный выпадающий список (select)
const StyledSelect = styled(StyledField).attrs({ as: 'select' })`
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

// Стилизованный чекбокс
const Checkbox = styled(Field).attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const CreateOrder = () => {
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, 'Phone number must be in the format +7(XXX)-XXX-XX-XX')
      .required('Phone number is required'),
    date: Yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),
    time: Yup.string().required('Time is required'),
    serviceType: Yup.string().when('otherService', {
      is: false,
      then: Yup.string().required('Service type is required'),
    }),
    otherServiceDescription: Yup.string().when('otherService', {
      is: true,
      then: Yup.string().required('Please describe the other service'),
    }),
    paymentMethod: Yup.string().required('Payment method is required'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Здесь можно отправить данные на сервер через сервис
  };

  return (
    <CreateOrderContainer>
      <CreateOrderTitle>Создать заказ</CreateOrderTitle>
      <Formik
        initialValues={{
          phone: '',
          date: '',
          time: '',
          serviceType: '',
          otherService: false,
          otherServiceDescription: '',
          paymentMethod: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            {/* Phone Number */}
            <FormBlock>
              <Label>Номер телефона (+7(XXX)-XXX-XX-XX)</Label>
              <StyledField name="phone" type="text" />
              <Error>{errors.phone && touched.phone ? errors.phone : null}</Error>
            </FormBlock>

            {/* Date and Time */}
            <FormBlock>
              <Label>Дата</Label>
              <StyledField name="date" type="date" />
              <Error>{errors.date && touched.date ? errors.date : null}</Error>
            </FormBlock>
            <FormBlock>
              <Label>Время</Label>
              <StyledField name="time" type="time" />
              <Error>{errors.time && touched.time ? errors.time : null}</Error>
            </FormBlock>

            {/* Service Type */}
            <FormBlock>
              <Label>Тип уборки</Label>
              <StyledSelect name="serviceType">
                <option value="">Выберете тип уборки</option>
                <option value="general_cleaning">Генеральная уборка</option>
                <option value="deep_cleaning">Общий клининг</option>
                <option value="post_construction_cleaning">Послестроительная уборка</option>
                <option value="carpet_and_furniture_cleaning">Ковры и химчистка</option>
              </StyledSelect>
              <Error>{errors.serviceType && touched.serviceType ? errors.serviceType : null}</Error>
            </FormBlock>

            {/* Other Service */}
            <FormBlock>
              <Label>
                <Checkbox name="otherService" />
                Иная услуга
              </Label>
            </FormBlock>
            {values.otherService && (
              <FormBlock>
                <Label>Пожалуйста, опишите услугу, которая нужна</Label>
                <StyledField name="otherServiceDescription" as="textarea" rows="3" />
                <Error>
                  {errors.otherServiceDescription && touched.otherServiceDescription
                    ? errors.otherServiceDescription
                    : null}
                </Error>
              </FormBlock>
            )}

            {/* Payment Method */}
            <FormBlock>
              <Label>Предпочтительный метод оплаты</Label>
              <StyledSelect name="paymentMethod">
                <option value="">Выберете метод оплаты</option>
                <option value="cash">Наличные</option>
                <option value="card">Банковская карта</option>
              </StyledSelect>
              <Error>{errors.paymentMethod && touched.paymentMethod ? errors.paymentMethod : null}</Error>
            </FormBlock>

            <SubmitButton type="submit">Создать</SubmitButton>
          </Form>
        )}
      </Formik>
    </CreateOrderContainer>
  );
};

export default CreateOrder;