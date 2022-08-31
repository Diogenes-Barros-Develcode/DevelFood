import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
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
import axios, {AxiosResponse} from 'axios';
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

interface responseObject {
  userID: number;
  allowEmail?: boolean;
  allowSMS?: boolean;
  allowCall?: boolean;
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

  const [mongoID, setMongoID] = useState<string>('');

  const [responseObject, setResponseObject] = useState<responseObject>(
    {} as responseObject,
  );

  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  const {data: dataID, fetchData} = useFetch<UserProps>('/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const get = async () => {
    await axios
      .get<Props>(`http://172.22.19.61:3333/userprivacy/${userID}`)
      .then((response: AxiosResponse) => {
        setResponseObject({
          userID: response.data.userID,
          allowSMS: response.data.allowSMS,
          allowEmail: response.data.allowEmail,
          allowCall: response.data.allowCall,
        });
        setIsAllowEmail(!!response?.data?.allowEmail || false);
        setIsAllowSMS(!!response?.data?.allowSMS || false);
        setIsAllowCall(!!response?.data?.allowCall || false);
        setMongoID(response?.data?._id);
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao carregar dados');
      });
    setLoading(false);
  };

  const post = async () => {
    const userOptions = {
      userID: dataID?.costumer?.id,
      allowSMS: isAllowSMS,
      allowEmail: isAllowEmail,
      allowCall: isAllowCall,
    };
    await axios
      .post('http://172.22.19.61:3333/userprivacy', userOptions)
      .catch(() => {
        Alert.alert('Erro', 'Erro ao salvar');
      });
  };

  const put = async () => {
    const userOptions: responseObject = {
      userID: dataID?.costumer?.id,
      allowSMS: isAllowSMS,
      allowEmail: isAllowEmail,
      allowCall: isAllowCall,
    };
    if (verify(userOptions, responseObject)) {
      return Alert.alert('Erro', 'As informações não foram modificadas');
    }
    await axios
      .put(`http://172.22.19.61:3333/userprivacy/${mongoID}`, userOptions)
      .catch(() => {
        Alert.alert('Erro', 'Erro ao editar');
      });
  };

  function verify(
    objectRequest: responseObject,
    objectResponse: responseObject,
  ) {
    const verify =
      JSON.stringify(objectRequest) === JSON.stringify(objectResponse);

    return verify;
  }

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
        {loading ? (
          <ActivityIndicator color={theme.colors.background} size={25} />
        ) : (
          <SaveTitle>Salvar</SaveTitle>
        )}
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
