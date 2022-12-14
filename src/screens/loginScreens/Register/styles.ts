import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
`;

export const TittleWrapper = styled.View`
  margin-left: ${RFValue(105)}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const CircleWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(60)}px;
`;

export const CircleAdjust = styled.View`
  align-items: center;
`;

export const Circle = styled.Image``;

export const CenterCircle = styled.Image`
  position: absolute;
  top: ${RFValue(4)}px;
`;

export const InputWrapper = styled.View`
  padding: 0 ${RFValue(30)}px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  padding: 0 ${RFValue(32)}px;
`;

export const ErrorImage = styled.Image`
  height: ${RFValue(30)}px;
  width: ${RFValue(30)}px;
  align-self: center;
  margin-top: ${RFValue(15)}px;
`;

export const ModalMessage = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
  text-align: center;
  margin-top: ${RFValue(15)}px;
`;
