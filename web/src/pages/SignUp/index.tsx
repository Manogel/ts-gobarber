import React from 'react';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />

          <Button type="submit">Cadastrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="login">
          <FiArrowLeft />
          Criar conta
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
