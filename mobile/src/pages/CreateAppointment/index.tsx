import React, { useCallback, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface IRouteParams {
  providerId: string;
}

export interface IProvider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IRouteParams;
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const navigateToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  React.useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleCalendar = useCallback(() => {
    setShowCalendar((state) => !state);
  }, []);

  const handleDateChanged = useCallback((event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowCalendar(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateToBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar
          source={{
            uri:
              user.avatar_url ||
              'https://api.adorable.io/avatars/100/abott@adorable.png',
          }}
        />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar
                source={{
                  uri:
                    provider.avatar_url ||
                    'https://api.adorable.io/avatars/100/abott@adorable.png',
                }}
              />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>
        <OpenDatePickerButton onPress={handleToggleCalendar}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>
        {showCalendar && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={selectedDate}
            textColor="#F4edf8"
            onChange={handleDateChanged}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
