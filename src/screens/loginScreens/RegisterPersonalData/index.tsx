import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {Input} from '@components/Input';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {ContinueButton} from '@components/ContinueButton';
import {cpf} from 'cpf-cnpj-validator';
import {InputMask} from '@components/InputMask';
import {useCreateUser} from '@global/context/createUserAuth';

import {
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, InputWrapper, Wrapper} from './styles';
import {HeaderComponent} from '@components/HeaderComponent';
import {
  CircleWrapper,
  CircleAdjust,
  Circle,
  CenterCircle,
} from '../Register/styles';

interface FormData {
  name: string;
  lastName: string;
  cpf: string;
  phone: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório.'),
  lastName: Yup.string().required('Sobrenome é obrigatório.'),
  cpf: Yup.string().test('is-cpf', 'CPF inválido.', value =>
    cpf.isValid(value!),
  ),
  phone: Yup.string()
    .required('Telefone é obrigatório.')
    .min(15, 'Telefone inválido.'),
});

export function RegisterPersonalData({route}: any) {
  const navigation = useNavigation();

  const {email, password} = route.params;

  const theme = useTheme();

  const {loading} = useCreateUser();

  function handlerBackButton() {
    navigation.goBack();
  }

  function handleContinue() {
    const values = getValues();

    navigation.navigate(
      'RegisterLocale' as never,
      {
        email,
        password,
        firstName: values.name,
        lastName: values.lastName,
        cpf: values.cpf,
        phone: values.phone,
      } as never,
    );
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle={theme.barStyles.dark}
          backgroundColor={theme.colors.background}
        />

        <HeaderComponent
          backgroudColor={theme.colors.background}
          name={'Cadastro'}
          source={theme.icons.arrow}
          iconColor={theme.colors.icon_black}
          onPress={handlerBackButton}
          Textcolor={theme.colors.icon_black}
        />

        <CircleWrapper>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.check} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
        </CircleWrapper>
        <Image
          source={theme.icons.womanup}
          style={{marginTop: RFValue(6), marginBottom: RFValue(20)}}
        />
        <Wrapper>
          <InputWrapper>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={errors.name && errors.name.message}
                  keyboardType="email-address"
                  placeholder="Nome"
                  source={theme.icons.name}
                  name="name"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={errors.lastName && errors.lastName.message}
                  keyboardType="email-address"
                  placeholder="Sobrenome"
                  source={theme.icons.name}
                  name="lastName"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastName"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={errors.cpf && errors.cpf.message}
                  keyboardType="email-address"
                  placeholder="CPF"
                  source={theme.icons.cpf}
                  name="cpf"
                  onChangeText={onChange}
                  value={cpf.format(value)}
                  maxLength={14}
                />
              )}
              name="cpf"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <InputMask
                  source={theme.icons.phone}
                  error={errors.phone && errors.phone.message}
                  editable={!loading}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Telefone"
                />
              )}
              name="phone"
            />

            <ContinueButton
              title="Continuar"
              onPressed={handleSubmit(handleContinue)}
              loading={loading}
            />
          </InputWrapper>
        </Wrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
}
