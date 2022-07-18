/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
import {useCreateCart} from '../../global/Context/Cart';
import {useFavorites} from '../../global/Context/Favorites';
import {useFetch} from '../../global/services/get';
import {usePut} from '../../global/services/put';
import {Plate} from '../../screens/RestaurantProfile';

import {
  Container,
  WrapperImage,
  PlateImage,
  WrapperPlateInfo,
  PlateTitle,
  PlateInfo,
  WrapperAdvancedInfo,
  Price,
  AddButton,
  TextButton,
  WrapperCartButton,
  AddQuantityButton,
  AddQuantityButtonImage,
  RemoveCartButton,
  RemoveQuantityButtonImage,
  NumberOfQuantityWrapper,
  Number,
  LitterButton,
  LitterImage,
  PriceWrapper,
  CleanUpButton,
  CleanUpImage,
  CleanUpTitle,
  FavoriteButton,
  FavoriteImage,
} from './styles';

interface ListPlatesProps {
  id: number;
  name: string;
  description: string;
  price: number;
  source: string;
  restaurantID?: number;
  restaurantFoodTypes?: string;
  restaurantName?: string;
  inside: boolean;
  photoRestaurant?: string;
  Swipe: boolean;
  favorite: any;
}

interface Photos {
  id: number;
  code: string;
}

interface ItemProps {
  id: number;
  quantity: number;
  price: number;
  restaurantID: number;
  name: string;
  description: string;
  source: string;
  restaurantFoodTypes?: string;
  restaurantName?: string;
  photoRestaurant?: string;
  unityPrice?: number;
}

interface FavoritesResponse {
  content: Plate[];
  totalPages: number;
}
export function Plates({
  name,
  description,
  price,
  source,
  restaurantID,
  id,
  restaurantFoodTypes,
  restaurantName,
  photoRestaurant,
  inside,
  Swipe,
  favorite,
}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const {
    addProductToCart,
    removeProductFromCart,
    cart,
    addNewProductoCart,
    cleanUpSamePlates,
  } = useCreateCart();

  const {favoritePlate} = useFavorites();

  const itemCount = cart.find((item: ItemProps) => item?.id === id)?.quantity;

  const {data, fetchData} = useFetch<Photos>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function priceConverter() {
    const priceWZeros = parseFloat(price.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }

  const priceFormatted = priceConverter();

  const leftSwipe = () => {
    return (
      <CleanUpButton onPress={() => cleanUpSamePlates(id, price)}>
        <View style={styles.deleteBox}>
          <CleanUpImage source={theme.icons.cleanUp} />
          <CleanUpTitle>Remover</CleanUpTitle>
        </View>
      </CleanUpButton>
    );
  };

  useEffect(() => {
    fetchData();
  }, [source]);

  // const [favoritePlates, setFavoritePlates] = useState<Plate[]>([]);

  const favoriteWhite = require('../../global/assets/Icons/favoriteRestaurant.png');

  const [isPressed, setIsPressed] = useState(false);

  // const [idPlate, setIdPlate] = useState<number>();

  // function favoritePlatesFunction() {
  //   setIdPlate(id);

  //   fetchFavorites();

  //   const itemFavorite = favoritePlates.find((item: Plate) => item?.id === id);

  //   itemFavorite && console.log('itemFavorite', itemFavorite);

  //   console.log('clicou no coração', dataFavorites);
  // }

  // const {
  //   data: dataFavorites,
  //   fetchData: fetchFavorites,
  //   loading: loadingFavorite,
  // } = useFetch<FavoritesResponse>(
  //   `/plate/favoritePlates/search?page=0&quantity=100`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   },
  // );

  // useEffect(() => {
  //   dataFavorites &&
  //     setFavoritePlates([...favoritePlates, ...dataFavorites.content]);
  // }, [dataFavorites]);

  // const {
  //   data: dataPut,
  //   handlerPut,
  //   error,
  // } = usePut<any>(`/plate/favorite/${idPlate}`, undefined, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  return Swipe ? (
    <Swipeable renderLeftActions={leftSwipe}>
      <Container>
        <WrapperImage>
          <PlateImage
            source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
          />
        </WrapperImage>

        <WrapperPlateInfo>
          <PlateTitle>{name}</PlateTitle>
          <PlateInfo>{description}</PlateInfo>

          <WrapperAdvancedInfo>
            <PriceWrapper>
              <Price>R$ {priceFormatted}</Price>
            </PriceWrapper>

            {itemCount && itemCount > 0 ? (
              <WrapperCartButton insideCart={inside ? RFValue(5) : RFValue(20)}>
                <AddQuantityButton
                  onPress={() => addProductToCart(id, price, restaurantID)}>
                  <AddQuantityButtonImage source={theme.icons.add} />
                </AddQuantityButton>

                <NumberOfQuantityWrapper>
                  <Number>
                    {cart.find((item: ItemProps) => item?.id === id)?.quantity}
                  </Number>
                </NumberOfQuantityWrapper>

                {itemCount > 1 ? (
                  <RemoveCartButton
                    onPress={() => removeProductFromCart(id, price)}>
                    <RemoveQuantityButtonImage source={theme.icons.remove} />
                  </RemoveCartButton>
                ) : (
                  <RemoveCartButton
                    onPress={() => removeProductFromCart(id, price)}>
                    <RemoveQuantityButtonImage source={theme.icons.remove} />
                  </RemoveCartButton>
                )}
              </WrapperCartButton>
            ) : (
              <AddButton
                onPress={() =>
                  addNewProductoCart(
                    id,
                    price,
                    restaurantID,
                    name,
                    description,
                    source,
                    restaurantFoodTypes,
                    restaurantName,
                    photoRestaurant,
                  )
                }>
                <TextButton>Adicionar</TextButton>
              </AddButton>
            )}
          </WrapperAdvancedInfo>
        </WrapperPlateInfo>
      </Container>
    </Swipeable>
  ) : (
    <Container>
      <FavoriteButton onPress={() => favoritePlate(id)}>
        <FavoriteImage
          source={favoriteWhite}
          // style={favorite && {tintColor: 'red'}} <<<<<<<<<<<
          style={favorite && {tintColor: 'red'}}
        />
      </FavoriteButton>

      <WrapperImage>
        <PlateImage
          source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
        />
      </WrapperImage>

      <WrapperPlateInfo>
        <PlateTitle>{name}</PlateTitle>
        <PlateInfo>{description}</PlateInfo>

        <WrapperAdvancedInfo>
          <PriceWrapper>
            <Price>R$ {priceFormatted}</Price>
          </PriceWrapper>

          {itemCount && itemCount > 0 ? (
            <WrapperCartButton insideCart={inside ? RFValue(5) : RFValue(20)}>
              <AddQuantityButton
                onPress={() => addProductToCart(id, price, restaurantID)}>
                <AddQuantityButtonImage source={theme.icons.add} />
              </AddQuantityButton>

              <NumberOfQuantityWrapper>
                <Number>
                  {cart &&
                    cart.find((item: ItemProps) => item?.id === id)?.quantity}
                </Number>
              </NumberOfQuantityWrapper>

              {itemCount && itemCount > 1 ? (
                <RemoveCartButton
                  onPress={() => removeProductFromCart(id, price)}>
                  <RemoveQuantityButtonImage source={theme.icons.remove} />
                </RemoveCartButton>
              ) : (
                <LitterButton onPress={() => removeProductFromCart(id, price)}>
                  <LitterImage source={theme.icons.litter} />
                </LitterButton>
              )}
            </WrapperCartButton>
          ) : (
            <AddButton
              onPress={() =>
                addNewProductoCart(
                  id,
                  price,
                  restaurantID,
                  name,
                  description,
                  source,
                  restaurantFoodTypes,
                  restaurantName,
                  photoRestaurant,
                )
              }>
              <TextButton>Adicionar</TextButton>
            </AddButton>
          )}
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}

const styles = StyleSheet.create({
  deleteBox: {
    backgroundColor: '#C20C18',
    height: RFValue(103),
    borderRadius: RFValue(8),
    width: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
