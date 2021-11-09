import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErrors';
import * as Style from './style';

import logoImg from '../../assets/logo.svg';

type FormData = {
  password: string;
  password_confirmation: string;
};

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = async (data: FormData): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Digite sua nova senha'),
        password_confirmation: Yup.string().required(
          'Digite novamente sua senha'
        ),
      });

      await schema.validate(data, { abortEarly: false });

      history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha!',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente!',
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
            <h1>Crie uma nova senha</h1>

            <Input
              type="password"
              name="password"
              icon={FiLock}
              placeholder="Nova senha"
            />

            <Input
              type="password"
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmar nova senha"
            />

            <Button type="submit">Enviar</Button>
          </Form>
        </Style.AnimationContainer>
      </Style.Content>
      <Style.Background />
    </Style.Container>
  );
};

export default ResetPassword;
