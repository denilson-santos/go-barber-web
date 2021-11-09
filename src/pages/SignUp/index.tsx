import React, { useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Style from './style';

import logoImg from '../../assets/logo.svg';
import getValidationErros from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/useToast';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = async (data: FormData): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite seu nome'),
        email: Yup.string()
          .required('Digite seu email')
          .email('Digite um email válido'),
        password: Yup.string()
          .required('Digite sua senha')
          .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao efetuar o cadastro, tente novamente.',
        });
      }
    }
  };

  return (
    <Style.Container>
      <Style.Background />

      <Style.Content>
        <Style.AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
            <Input
              type="text"
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              type="password"
              name="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Fazer logon
          </Link>
        </Style.AnimationContainer>
      </Style.Content>
    </Style.Container>
  );
};

export default SignUp;
