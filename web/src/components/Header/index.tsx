import React, { memo } from 'react';
import { FiPower } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import { Header as Container, HeaderContent, Profile } from './styles';
import { useAuth } from '../../hooks/Auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <img src={logoimg} alt="GoBarber" />

        <Profile>
          <img src={user.avatar_url} alt={user.name} />
          <div>
            <span>Bem vindo,</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Container>
  );
};

export default memo(Header);
