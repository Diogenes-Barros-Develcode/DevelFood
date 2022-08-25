import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Content,
  DataPrivacyWrapper,
  PrivacyText,
  PrivacyTitle,
  SaveButton,
  SaveTitle,
  Title,
} from './styles';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {HeaderComponent} from '@components/HeaderComponent';
import {useTheme} from 'styled-components';
import {useEffect} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAuth} from '@global/context';
import {useFetch} from '@global/services/get';
interface Props {
  _id: string;
  userID: number;
  allowSMS: boolean;
  allowEmail: boolean;
  allowCall: boolean;
}
interface CostumerProps {
  id: number;
  firstName: string;
  photo_url: string;
}
interface UserProps {
  costumer: CostumerProps;
}

export function DataPrivacy({userID}: Props) {
  const theme = useTheme();

  const {
    token,
    isAllowEmail,
    setIsAllowEmail,
    isAllowSMS,
    setIsAllowSMS,
    isAllowCall,
    setIsAllowCall,
  } = useAuth();

  const [data, setData] = useState<Props>({} as Props);

  const [mongoID, setMongoID] = useState<string>('');

  const navigation = useNavigation();

  const {data: dataID, fetchData} = useFetch<UserProps>('/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const get = async () => {
    await axios
      .get<Props>(
        `https://bd29-2804-14c-7d86-a174-b4f9-86e9-a1fb-31b5.sa.ngrok.io/userprivacy/${userID}`,
      )
      .then((response: AxiosResponse) => {
        setData(response.data);
        setIsAllowEmail(!!response?.data?.allowEmail || false);
        setIsAllowSMS(!!response?.data?.allowSMS || false);
        setIsAllowCall(!!response?.data?.allowCall || false);
        setMongoID(response?.data?._id);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const post = async () => {
    const userOptions = {
      userID: dataID?.costumer?.id,
      allowEmail: isAllowEmail,
      allowSMS: isAllowSMS,
      allowCall: isAllowCall,
    };
    await axios
      .post(
        'https://bd29-2804-14c-7d86-a174-b4f9-86e9-a1fb-31b5.sa.ngrok.io/userprivacy',
        userOptions,
      )
      .then(() => {
        setIsAllowSMS(isAllowSMS);
        setIsAllowEmail(isAllowEmail);
        setIsAllowCall(isAllowCall);
      })
      .catch((error: AxiosError) => {
        Alert.alert('Erro', 'Erro ao salvar');
      });
  };

  const put = async () => {
    const userOptions = {
      userID: dataID?.costumer?.id,
      allowEmail: isAllowSMS,
      allowSMS: isAllowEmail,
      allowCall: isAllowCall,
    };
    await axios
      .put(
        `https://bd29-2804-14c-7d86-a174-b4f9-86e9-a1fb-31b5.sa.ngrok.io/userprivacy/${mongoID}`,
        userOptions,
      )
      .then(() => {
        setIsAllowEmail(isAllowEmail);
        setIsAllowSMS(isAllowSMS);
        setIsAllowCall(isAllowCall);
        console.log('console.log ==>', isAllowEmail, isAllowCall, isAllowSMS);
      })
      .catch((error: AxiosError) => {
        Alert.alert('Erro', 'Erro ao editar');
        console.log(error);
      });
  };

  function handleNotificationButton() {
    if (mongoID) {
      put();
    } else {
      post();
    }
  }

  useFocusEffect(
    useCallback(() => {
      get();
      fetchData();
    }, [mongoID]),
  );

  return (
    <Container>
      <HeaderComponent
        name="Privacidade de Dados"
        Textcolor={theme.colors.text_dark}
        source={theme.icons.arrow}
        onPress={navigation.goBack}
        backgroudColor={theme.colors.background}
      />
      <Content>
        <PrivacyText>
          De acordo com a Lei Geral de Proteção de Dados Pessoais (LGPD), para
          que os seus dados pessoas estejam seguros e possam ser utilizados
          apenas nos benefícios que você deseja, é necessario que você consista
          o uso deles, clicando abaixo:
        </PrivacyText>

        <PrivacyTitle>Por onde aceita receber comunicação?</PrivacyTitle>

        <DataPrivacyWrapper>
          <Title>Aceita receber e-mail com promoções?</Title>
          <CheckBox
            style={styles.checkbox}
            value={isAllowEmail}
            onValueChange={setIsAllowEmail}
            disabled={false}
          />
        </DataPrivacyWrapper>

        <DataPrivacyWrapper>
          <Title>Aceita receber sms com promoções?</Title>
          <CheckBox
            style={styles.checkbox}
            value={isAllowSMS}
            onValueChange={setIsAllowSMS}
            disabled={false}
          />
        </DataPrivacyWrapper>

        <DataPrivacyWrapper>
          <Title>Aceita receber ligações com promoções?</Title>
          <CheckBox
            style={styles.checkbox}
            value={isAllowCall}
            onValueChange={setIsAllowCall}
            disabled={false}
          />
        </DataPrivacyWrapper>
      </Content>

      <SaveButton
        onPress={() => {
          handleNotificationButton();
          setTimeout(() => {
            get();
          }, 500);
        }}>
        <SaveTitle>Salvar</SaveTitle>
      </SaveButton>
    </Container>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: RFValue(20),
    height: RFValue(20),
  },
});
