import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;

export const List = styled.FlatList`
  font-family: ${({theme}) => theme.fonts.secondaryMed};
`;

export const TitleWrapper = styled.View`
  margin-left: ${RFValue(14)}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
  font-weight: bold;
`;

export const CategorySelect = styled.ScrollView`
  flex-direction: row;
  margin-top: ${RFValue(18)}px;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 ${RFValue(12)}px;
  margin-top: ${RFValue(12)}px;
`;

export const RestaurantListWrapper = styled.View``;

export const RestaurantList = styled.FlatList`
  flex: 1;
`;

export const Footer = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  align-items: center;
  top: ${RFValue(20)}px;
`;
