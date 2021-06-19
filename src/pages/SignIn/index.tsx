import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Style from './style';

import { useAuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo.svg';
import getValidationErros from '../../utils/getValidationErrors';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuthContext();

  async function handleSubmit(data: FormData): Promise<void> {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Digite seu email')
          .email('Digite um email válido'),
        password: Yup.string().required('Digite sua senha'),
      });

      await schema.validate(data, { abortEarly: false });

      signIn({ email: data.email, password: data.password });
    } catch (error) {
      const errors = getValidationErros(error);

      formRef.current?.setErrors(errors);
    }
  }

  return (
    <Style.Container>
      <Style.Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input type="text" name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="/forgot">Esqueci minha senha</a>
        </Form>

        <a href="/login">
          <FiLogIn />
          Criar conta
        </a>
      </Style.Content>
      <Style.Background />
    </Style.Container>
  );
};

export default SignIn;
