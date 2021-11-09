import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErrors';
import * as Style from './style';

import logoImg from '../../assets/logo.svg';

type FormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = async (data: FormData): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Digite seu email')
          .email('Digite um email válido'),
      });

      await schema.validate(data, { abortEarly: false });

      history.push('/dashboard');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha!',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente!',
        });
      }
    }
  };

  return (
    <Style.Container>
      <Style.Content>
        <Style.AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input
              type="text"
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Button type="submit">Enviar</Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao logon
          </Link>
        </Style.AnimationContainer>
      </Style.Content>
      <Style.Background />
    </Style.Container>
  );
};

export default ForgotPassword;
