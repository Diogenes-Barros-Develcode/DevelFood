import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  width: 100%;
  height: 100%;
  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
`;

export const PrivacyText = styled.Text`
  font-size: ${RFValue(12)}px;
  text-align: justify;
  color: ${({theme}) => theme.colors.text_dark};
  font-weight: 400;
`;

export const PrivacyTitle = styled.Text`
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
  font-size: ${RFValue(15)}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text_dark};
  text-align: center;
`;

export const DataPrivacyWrapper = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
  font-weight: 400;
`;

export const SaveButton = styled.TouchableOpacity`
  width: 90%;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${({theme}) => theme.colors.background_red};
  position: absolute;
  bottom: ${RFValue(20)}px;
`;

export const SaveTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.background};
`;
