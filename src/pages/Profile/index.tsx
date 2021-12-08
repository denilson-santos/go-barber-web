import React, { ChangeEvent, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Style from './style';

import getValidationErros from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

type FormData = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = async (data: FormData): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite seu nome'),
        email: Yup.string()
          .required('Digite seu email')
          .email('Digite um email válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val: string) => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });

      await schema.validate(data, { abortEarly: false });

      const formData = {
        name: data.name,
        email: data.email,
        ...(data.old_password
          ? {
              old_password: data.old_password,
              password: data.password,
              password_confirmation: data.password_confirmation,
            }
          : {}),
      };

      const response = await api.put('/profile', formData);

      updateUser(response.data);

      history.push('/dashboard');

      addToast({
        type: 'success',
        title: 'Perfil atualizado',
        description:
          'Suas informações do perfil foram atualizadas com sucesso!',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    }
  };

  const handleAvatarChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files) {
      try {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        const response = await api.patch('/users/avatar', data);

        updateUser(response.data);

        addToast({ type: 'success', title: 'Avatar atualizado!' });
      } catch (error) {
        addToast({ type: 'error', title: 'Avatar não atualizado!' });
      }
    }
  };

  return (
    <Style.Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Style.Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{ name: user?.name, email: user?.email }}
        >
          <Style.AvatarInput>
            <img src={user?.avatar_url} alt={user?.name} />

            <label htmlFor="avatar">
              <FiCamera />
              <input
                type="file"
                name=""
                id="avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </Style.AvatarInput>

          <h1>Meu Perfil</h1>

          <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
          <Input type="text" name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{
              marginTop: 24,
            }}
            type="password"
            name="old_password"
            icon={FiLock}
            placeholder="Senha Atual"
          />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Nova Senha"
          />

          <Input
            type="password"
            name="password_confirmation"
            icon={FiLock}
            placeholder="Confirmar Senha"
          />

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Style.Content>
    </Style.Container>
  );
};

export default Profile;
