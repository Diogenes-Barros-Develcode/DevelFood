import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  width: 100%;
  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
`;

export const DataPrivacyWrapper = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text``;

export const SubmitButton = styled.TouchableOpacity`
  width: ${RFValue(200)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(30)}px;
  border: ${RFValue(1)}px;
  border-color: ${({theme}) => theme.colors.modalButtonClose};
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background};
  top: ${RFValue(35)}px;
  margin-bottom: ${RFValue(40)}px;
`;

export const SubmitButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.background_red};
`;
