import React, {useState} from 'react';
import styled from 'styled-components'
import {registration} from '../../asyncActions/UserAsyncActions'

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #3b6ec0;
  background: transparent;
  width: 100%;
  padding: 3px;
  font-size: 18px;
  line-height: 21px;
  color: #000;
  margin-bottom: 30px;

  :focus {
    outline: none;
    transform: scale(1.01);
  }
;

  ::placeholder {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #3b6ec0;
  }
`
const RegistrationWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  align-self: center;
  margin: 0 auto;
  margin-top: 100px;
`
const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  line-height: 33px;
  color: #3b6ec0;
  margin-bottom: 40px;
`

const Button = styled.button`
  border-radius: 12px;
  padding: 7px 15px;
  background-color: #3b6ec0;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  color: #e1e6ec;
  transition: .3s;

  :hover {
    background-color: #fff;
    color: #3b6ec0;
  }
`

export const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <RegistrationWrapper onSubmit={e => e.preventDefault()}>
            <Title>Регистрация</Title>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Введите email..."/>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                   placeholder="Введите пароль..."/>
            <Button onClick={() => registration(email, password)}>Создать аккунт</Button>
        </RegistrationWrapper>
    );
}
