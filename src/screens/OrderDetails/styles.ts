import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
  top: ${RFValue(22)}px;
`;

export const FavoriteIconWrapper = styled.View`
  width: ${RFValue(42)}px;
  height: ${RFValue(42)}px;
  position: absolute;
  right: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.TouchableOpacity``;

export const FavoriteIcon = styled.Image`
  width: ${RFValue(26)}px;
  height: ${RFValue(22)}px;
  border-color: ${({theme}) => theme.colors.icon_red};
`;

export const PlateInfoWrapper = styled.View`
  width: ${RFValue(312)}px;
  height: ${RFValue(356)}px;
  align-self: center;
  margin-top: ${RFValue(24)}px;
`;
export const PlatePhoto = styled.Image`
  width: ${RFValue(200)}px;
  height: ${RFValue(150.18)}px;
  border-radius: ${RFValue(10)}px;
  align-self: center;
`;
export const PlateName = styled.Text`
  font-weight: 500;
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin-top: ${RFValue(20)}px;
  width: ${RFValue(298)}px;
`;
export const FoodType = styled.Text`
  font-weight: 400;
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_gray};
  width: ${RFValue(298)}px;
`;
export const Description = styled.Text``;
export const RestaurantWrapper = styled.View``;
export const RestaurantIcon = styled.Image``;
export const RestaurantName = styled.Text``;
