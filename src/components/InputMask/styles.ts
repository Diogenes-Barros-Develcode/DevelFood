import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: ${RFValue(12)}px;
  border: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${({theme}) => theme.colors.text_gray};
`;

export const LoginIcon = styled.Image`
  margin-left: ${RFValue(10)}px;
`;

export const TextMask = styled(TextInputMask)`
  margin-left: ${RFValue(7)}px;
  width: ${RFValue(250)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Error = styled.Text`
  align-self: flex-start;
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.background_red};
`;
