import React from 'react';

import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Icon color="#666360" name={icon} size={20} />
      <TextInput
        placeholderTextColor="#666360"
        {...rest}
        keyboardAppearance="dark"
      />
    </Container>
  );
};

export default Input;
