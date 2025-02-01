import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Стилизованный контейнер для формы
const CreateOrderContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

// Стилизованный заголовок
const CreateOrderTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
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

const CreateOrderForm = () => {
    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Тип услуги обязателен'),
        size: Yup.number()
            .required('Размер обязателен')
            .positive('Размер должен быть положительным числом'),
        frequency: Yup.string().required('Частота обслуживания обязательна'),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:5000/api/orders', values); // Отправка данных на сервер
            alert('Заявка успешно создана!');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Ошибка при создании заявки.');
        }
    };

    return (
        <CreateOrderContainer>
            <CreateOrderTitle>Создать новую заявку</CreateOrderTitle>
            <Formik
                initialValues={{ type: '', size: '', frequency: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        {/* Тип услуги */}
                        <FormBlock>
                            <Label>Тип услуги</Label>
                            <StyledSelect name="type">
                                <option value="">Выберите тип услуги</option>
                                <option value="residential">Жилая уборка</option>
                                <option value="commercial">Коммерческая уборка</option>
                                <option value="deep_cleaning">Генеральная уборка</option>
                                <option value="carpet_cleaning">Химчистка ковров</option>
                            </StyledSelect>
                            <Error>{errors.type && touched.type ? errors.type : null}</Error>
                        </FormBlock>

                        {/* Размер помещения */}
                        <FormBlock>
                            <Label>Размер помещения (кв.м)</Label>
                            <StyledField name="size" type="number" />
                            <Error>{errors.size && touched.size ? errors.size : null}</Error>
                        </FormBlock>

                        {/* Частота обслуживания */}
                        <FormBlock>
                            <Label>Частота обслуживания</Label>
                            <StyledSelect name="frequency">
                                <option value="">Выберите частоту</option>
                                <option value="daily">Ежедневно</option>
                                <option value="weekly">Еженедельно</option>
                                <option value="monthly">Ежемесячно</option>
                            </StyledSelect>
                            <Error>{errors.frequency && touched.frequency ? errors.frequency : null}</Error>
                        </FormBlock>

                        {/* Кнопка отправки */}
                        <SubmitButton type="submit">Отправить заявку</SubmitButton>
                    </Form>
                )}
            </Formik>
        </CreateOrderContainer>
    );
};

export default CreateOrderForm;