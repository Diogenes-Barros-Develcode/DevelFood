import React, {useState} from 'react';
import {useTheme} from 'styled-components';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import {
  Alert,
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  Content,
  Title,
  Description,
  StepBar,
  SectionStepSelected,
} from './styles';
import {Input} from '@components/Input';
import {ContinueButton} from '@components/ContinueButton';
import {HeaderComponent} from '@components/HeaderComponent';
import api from '@global/services/api';

interface FormData {
  token: string;
  password: string;
  confirmPassword: string;
  creationDate: Date;
}

const schema = Yup.object().shape({
  token: Yup.string().required('Token é obrigatório.'),
  password: Yup.string()
    .min(6, 'Minimo de 6 caracteres.')
    .max(15, 'Maximo de 15 caracteres.')
    .required('Senha é obrigatória.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem ser identicas.')
    .max(15, 'Maximo de 15 caracteres.')
    .required('Confirmação de senha é obrigatória.'),
});

export function RedefinePassword() {
  const theme = useTheme();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: FormData) => {
    setLoading(true);
    await api
      .put('reset-password/change-password', {
        token: value.token,
        password: value.password,
      })
      .then(() => {
        navigation.navigate('RedefineSuccess' as never);
      })
      .catch(() => {
        Alert.alert('Token incorreto.');
      });
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle={theme.barStyles.dark}
          />
          <HeaderComponent
            backgroudColor={theme.colors.background}
            name=""
            Textcolor={theme.colors.text_dark}
            source={theme.icons.arrow}
            iconColor={theme.colors.icon_black}
            onPress={() => navigation.navigate('Login' as never)}
          />
          <Content>
            <StepBar>
              <SectionStepSelected />
              <SectionStepSelected />
              <SectionStepSelected />
            </StepBar>
            <Image source={theme.images.lock} />

            <Title>Redefinir Senha</Title>
            <Description>
              Sua nova senha deve ter no mínimo 6 caracteres
            </Description>

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={errors.token && errors.token.message}
                  keyboardType="default"
                  placeholder="Token"
                  source={theme.icons.password}
                  name="token"
                  onChangeText={onChange}
                  value={value}
                  sourcePassword
                />
              )}
              name="token"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={errors.password && errors.password.message}
                  keyboardType="default"
                  placeholder="senha"
                  source={theme.icons.password}
                  name="password"
                  onChangeText={onChange}
                  value={value}
                  sourcePassword
                />
              )}
              name="password"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  editable={!loading}
                  error={
                    errors.confirmPassword && errors.confirmPassword.message
                  }
                  keyboardType="default"
                  placeholder="confirmar senha"
                  source={theme.icons.password}
                  name="password"
                  onChangeText={onChange}
                  value={value}
                  sourcePassword
                />
              )}
              name="confirmPassword"
            />

            <ContinueButton
              onPressed={handleSubmit(onSubmit)}
              loading={loading}
              title="Confirmar"
            />
          </Content>
        </>
      </Container>
    </TouchableWithoutFeedback>
  );
}
