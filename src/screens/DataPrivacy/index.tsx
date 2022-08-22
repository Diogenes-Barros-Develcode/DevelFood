import React, {useState} from 'react';
import {Text} from 'react-native';
import {Container, Content, DataPrivacyWrapper, Title} from './styles';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {HeaderComponent} from '@components/HeaderComponent';
import {useTheme} from 'styled-components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {RouteProp} from '@react-navigation/native';
import {useAuth} from '@global/context';
import {useFetch} from '@global/services/get';

interface Props {
  id: number;
  name: string;
}
interface CostumerProps {
  id: number;
  firstName: string;
  photo_url: string;
}
interface UserProps {
  costumer: CostumerProps;
}

export function DataPrivacy() {
  const theme = useTheme();

  const {token, isAllowEmail, setIsAllowEmail, isAllowSMS, setIsAllowSMS, isAllowCall, setIsAllowCall} = useAuth();

  const [data, setData] = useState();

  // const navigation = useNavigation();

  const {data: dataID, fetchData} = useFetch<UserProps>('/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const get = async () => {
    await axios
      .get<Props>('http://192.168.0.7:3333/sms')
      .then((response: AxiosResponse) => {
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const post = async () => {
    const userOptions = {
      userID: dataID?.costumer?.id,
      allowSMS: isAllowEmail,
      allowEmail: isAllowSMS,
      allowCall: isAllowCall,
    };
    await axios
      .post('http://192.168.0.7:3333/notification', userOptions)
      .then((response: AxiosResponse) => {
        console.log('erro1', response.data);
        setIsAllowEmail(isAllowEmail);
        setIsAllowSMS(isAllowSMS);
        setIsAllowCall(isAllowCall);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get();
    fetchData();
    console.log(dataID?.costumer?.id);
    // console.log('opa',IsAllowEmail)
    console.log('oi',isAllowEmail)
  }, [data]);

  return (
    <Container>
      <HeaderComponent
        name="Privacidade de Dados"
        Textcolor={theme.colors.text_dark}
      />
      <Content>
        <DataPrivacyWrapper>
          <Title>Aceita receber email com promoções?</Title>
          <Text>{dataID?.costumer?.id}</Text>
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

        <TouchableOpacity
          style={[styles.submitButton]}
          onPress={() => {
            post();
            console.log('click', isAllowEmail);
          }}>
          <Text>Salvar</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: RFValue(20),
    height: RFValue(20),
  },
  submitButton: {
    width: RFValue(200),
    height: RFValue(50),
    borderRadius: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: '400',
  },
});
