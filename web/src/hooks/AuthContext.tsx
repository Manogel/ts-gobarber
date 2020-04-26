import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('@Gobarber:token', token);
      localStorage.setItem('@Gobarber:user', JSON.stringify(user));

      setAuth({ token, user });
    },
    [setAuth],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');

    setAuth({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: auth.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
