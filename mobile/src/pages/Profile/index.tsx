import React, { useRef, useCallback, useEffect } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
import api from '../../services/api';
import Button from '../../components/Button';
import {
  BackButton,
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';

interface IProfileFormData {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmationPasswordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!user) return;

    formRef.current?.setData({
      ...user,
      oldPassword: '',
      password: '',
      password_confirmation: '',
    });
  }, [user]);

  const handleSignUp = useCallback(
    async (data: IProfileFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Informe um email válido')
            .required('E-mail obrigatório'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val) => !!val.length,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(5, 'No mínimo 5 caracteres!'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('oldPassword', {
              is: (val) => !!val.length,
              then: Yup.string()
                .required('Campo obrigatório')
                .min(5, 'No mínimo 5 caracteres!'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          password_confirmation,
          password,
          oldPassword,
        } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                password,
                oldPassword,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar camera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar.');
          return;
        }

        const data = new FormData();
        data.append('avatar', {
          uri: response.uri,
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
        });

        api.patch('/users/avatar', data).then((resp) => {
          updateUser(resp.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const navigateToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Container>
              <BackButton onPress={navigateToBack}>
                <Icon name="chevron-left" size={24} color="#999591" />
              </BackButton>
              <UserAvatarButton onPress={handleUpdateAvatar}>
                <UserAvatar
                  source={{
                    uri:
                      user?.avatar_url ||
                      'https://api.adorable.io/avatars/100/abott@adorable.png',
                  }}
                />
              </UserAvatarButton>
              <View>
                <Title>Meu perfil</Title>
              </View>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />
              <Input
                ref={oldPasswordInputRef}
                name="oldPassword"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                textContentType="newPassword"
                containerStyle={{
                  marginTop: 16,
                }}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmationPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmationPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirme sua senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Container>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
