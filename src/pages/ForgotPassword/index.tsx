import React, { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErrors';
import * as Style from './style';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

type FormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = async (data: FormData): Promise<void> => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Digite seu email')
          .email('Digite um email válido'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/password/forgot', {
        email: data.email,
      });

      addToast({
        type: 'success',
        title: 'Recuperação de senha',
        description:
          'Enviamos um email para você com um link para criação de um a nova senha, cheque sua caixa de entrada para concluir o processo.',
      });
    } catch (error) {
      setLoading(true);

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
    } finally {
      setLoading(false);
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

            <Button loading={loading} type="submit">
              Enviar
            </Button>
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
