import styled from 'styled-components';
import picture from '../images/scan2.png';
import Content from './Content';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import arrow from '../images/Vector 2.png';
import React, {useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 35%;

  @media (max-width: 768px) {
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    width: 84%;
  }
`;
const Label = styled.label`
  margin-top: 46px;
  font-size: 22px;
  font-weight: 700;
  line-height: 22.6px;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 15px;
  outline: none;
  border: 0.8px solid #232323;
`;
const Line = styled.div`
  width: 237px;
  height: 1px;
  background-color: #000;
  margin-top: 15vh;
  margin-left: 4px;
`;
const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #626262;
  max-width:365px;
  width: 100%;
  margin-top: 10px;
`;
const ImgArrow = styled.img``;
const Button = styled.button`
  background-color: #e5e7e9;
  position: absolute;
  left: 50%;
  top:90vh;
  transform: translateX(-50%);
  border: none;
  @media screen and (max-width:768px) {
    top:77vh;
  }
`;
const ErrorMessage = styled.p`
  color: #f15524;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;
export default function Private() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('სახელის ველის შევსება სავალდებულოა')
      .min(2, 'სახელის ველი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან')
      .matches(/^[a-zA-Zა-ჰ]+$/, 'სახელი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს'),
    lastname: yup
      .string()
      .required('გვარის ველის შევსება სავალდებულოა')
      .min(2, 'გვარის ველი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან')
      .matches(/^[a-zA-Zა-ჰ]+$/, 'გვარი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს'),
    email: yup
      .string()
      .required('იმეილის ველის შევსება სავალდებულოა')
      .matches(
        /^[A-Za-z0-9._%+-]+@redberry\.ge$/,
        'გთხოვთ დარეგისტრირდეთ Redberry-ს მეილით (youremail@redberry.ge)'
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  type FormData = yup.InferType<typeof schema>;

  const [value, setValue] = useState<{
    name: string;
    lastname: string;
    email: string;
  }>({
      name: '',
      lastname: '',
      email: '',
  });

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    setValue({ ...value, [name]: target.value });
  };

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('myStates');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setValue(parsedState);
      }
    } catch (error) {
      console.error('Error parsing saved state:', error);
    }
  }, []);

   useEffect(() => {
    localStorage.setItem('myStates', JSON.stringify(value));
  }, [value]);
  
  const nav = useNavigate();
  function HandleClick() {
      nav('/privateroute',{state:{
        name:value.name,
        lastname:value.lastname,
        email:value.email
      }});
  }

  const lastname = register('lastname');
  const email = register('email');
  const name = register('name');

  return (
    <>
    
   
      <Content
        picture={picture}
        inputs={
          <Form onSubmit={handleSubmit(HandleClick)}>
            <Label>სახელი*</Label>
            <Input
              {...name}
              type='text'
              placeholder='ხატია'
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              name='name'
              value={value.name}
            ></Input>
            {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}

            <Label>გვარი*</Label>
            <Input
              type='text'
              placeholder='ჩუბინიძე'
              value={value.lastname}
              {...lastname}
              onChange={(e) => {
                lastname.onChange(e);
                handleChange(e);
              }}
              name='lastname'
            ></Input>
            {errors.lastname && (
              <ErrorMessage>{errors.lastname?.message}</ErrorMessage>
            )}

            <Label>მეილი*</Label>
            <Input
              type='mail'
              placeholder='fbi@redberry.ge'
              value={value.email}
              {...email}
              name='email'
              onChange={(e) => {
                email.onChange(e);
                handleChange(e);
              }}
            ></Input>
            {errors.email && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
            <Line></Line>
            <Paragraph>*-ით მონიშნული ველების შევსება სავალდებულოა</Paragraph>
            <Button type='submit'>
              <ImgArrow style={{opacity:value.name&&value.lastname&&value.email?'100%':'50%'}} src={arrow}></ImgArrow>
            </Button>
          </Form>
        }
      />
    </>
  );
}
