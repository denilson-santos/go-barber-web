import React, { useCallback } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Style from './style';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <Style.Container>
      <Style.Background />

      <Style.Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
          <Input type="text" name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="/login">
          <FiArrowLeft />
          Fazer logon
        </a>
      </Style.Content>
    </Style.Container>
  );
};

export default SignUp;
