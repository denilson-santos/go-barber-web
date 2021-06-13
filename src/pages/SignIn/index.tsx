import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Style from './style';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Style.Container>
    <Style.Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input type="text" name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Senha"
        />

        <Button type="button">Entrar</Button>

        <a href="/forgot">Esqueci minha senha</a>
      </form>

      <a href="/login">
        <FiLogIn />
        Criar conta
      </a>
    </Style.Content>
    <Style.Background />
  </Style.Container>
);

export default SignIn;
