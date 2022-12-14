import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Dimensions, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {Input} from '@components/Input';
import {useAuth} from '@global/context';
import {useFetch} from '@global/services/get';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDebouncedCallback} from 'use-debounce';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {ListEmptyComponent} from '@components/ListEmptyComponent';
import {FlatList} from 'react-native-gesture-handler';
import {Restaurants} from '@components/Restaurants';
import {Category} from '@components/CategoryButton';

import {
  Container,
  Content,
  TitleWrapper,
  Title,
  CategorySelect,
  RestaurantListWrapper,
  Footer,
} from './styles';
import {HeaderComponent} from '@components/HeaderComponent';
import {PhotoSlider} from '@components/PhotoSlider';
import light from '@global/styles/light';

interface ListRestaurantProps {
  food_types: ListFoodType[];
  id: number;
  name: string;
  photo_url: string;
}
interface ListRestaurantResponse {
  content: ListRestaurantProps[];
  totalPages: number;
  totalElements: number;
}
interface ListFoodType {
  id: number;
  name: string;
}

const CardMargins =
  (Dimensions.get('screen').width - RFValue(312)) / RFValue(3.5);

export function Home() {
  const theme = useTheme();

  const {token} = useAuth();

  const [isFiltred, setIsFiltred] = useState({
    text: '',
    page: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<ListFoodType[]>([]);

  const [foodType, setFoodType] = useState<string>('');

  const [activeButton, setActiveButton] = useState<string>('');

  const [restaurants, setRestaurants] = useState<ListRestaurantProps[]>([]);

  const navigation = useNavigation();

  function handleRestaurantProfile(
    id: number,
    name: string,
    photo_url: string,
    food_types: string,
  ) {
    navigation.navigate(
      'RestaurantProfile' as never,
      {id, name, photo_url, food_types} as never,
    );
  }

  const {data, fetchData} = useFetch<ListRestaurantResponse>(
    `/restaurant/filter?${foodType !== '' ? `foodType=${foodType}&` : ''}name=${
      isFiltred.text
    }&page=${isFiltred.page}&quantity=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const {data: datafoodtype, fetchData: fetchfoodtype} = useFetch<
    ListFoodType[]
  >('/foodType', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: ListRestaurantResponse) {
    setRestaurants([...restaurants, ...response.content]);
  }

  async function loadRestaurants() {
    setIsLoading(true);
    await fetchData(onSuccess);
    setIsLoading(false);
  }

  async function handleLoadOnEnd() {
    if (isFiltred.page + 1 < data.totalPages) {
      setIsFiltred({...isFiltred, page: isFiltred.page + 1});
    }
  }

  function handleSearch(value: string) {
    setIsLoading(true);
    if (value.length > 1) {
      setRestaurants([]);
      setIsFiltred({text: value, page: 0});
    } else {
      setRestaurants([]);
      setIsFiltred({text: '', page: 0});
    }
    setIsLoading(false);
  }

  const debounced = useDebouncedCallback(value => {
    handleSearch(value);
  }, 1500);

  const renderItem = ({item}: {item: ListRestaurantProps}) => {
    return (
      <RestaurantListWrapper>
        <Restaurants
          onPress={() =>
            handleRestaurantProfile(
              item.id,
              item.name,
              item.photo_url,
              item.food_types.length > 0 ? item.food_types[0].name : '',
            )
          }
          name={item.name}
          id={item.id}
          category={item?.food_types ? item.food_types[0]?.name : ''}
          avaliation={item.id}
          source={item.photo_url ? item.photo_url : theme.images.noImage}
        />
      </RestaurantListWrapper>
    );
  };

  const onPress = (item: ListFoodType) => {
    activeButton === item.name
      ? setActiveButton('')
      : setActiveButton(item.name);
    setRestaurants([]);
    foodType === item.name ? setFoodType('') : setFoodType(item.name);
    setIsFiltred({...isFiltred, page: 0});
  };

  const renderCategories =
    categories.length > 1 &&
    categories?.map(item => {
      return (
        <Category
          key={item.id}
          title={item.name}
          style={
            activeButton === item.name && {
              backgroundColor: theme.colors.background,
              borderWidth: 2,
              borderColor: theme.colors.background_red,
            }
          }
          textStyle={
            activeButton === item.name && {color: theme.colors.icon_red}
          }
          onPress={() => onPress(item)}
        />
      );
    });

  const ref = useRef<FlatList>(null);

  useScrollToTop(ref);

  useEffect(() => {
    loadRestaurants();
  }, [isFiltred, foodType]);

  useEffect(() => {
    (async () => {
      await fetchfoodtype();
    })();
  }, []);

  useEffect(() => {
    datafoodtype && setCategories(datafoodtype);
  }, [datafoodtype]);

  return (
    <>
      <Container>
        <StatusBar
          barStyle={'light-content'}
          translucent={false}
          backgroundColor={theme.colors.background_red}
          animated
        />

        <HeaderComponent
          backgroudColor={theme.colors.background_red}
          name="Rua Arcy da Rocha N., 559"
          source={theme.icons.map}
          iconColor={theme.colors.icon_light}
          Textcolor={theme.colors.text_light}
        />

        <FlatList
          ref={ref}
          data={restaurants}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: RFValue(CardMargins),
            paddingBottom: 10,
          }}
          contentContainerStyle={{
            width: '100%',
          }}
          ListHeaderComponent={
            <>
              <PhotoSlider />

              <TitleWrapper>
                <Title>Categoria</Title>
              </TitleWrapper>

              <CategorySelect
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: RFValue(10)}}>
                {renderCategories}
              </CategorySelect>

              <Content>
                <Input
                  source={theme.icons.search}
                  placeholder="Buscar restaurantes"
                  keyboardType="email-address"
                  onChangeText={value => debounced(value)}
                />
              </Content>
            </>
          }
          ListFooterComponent={() => (
            <Footer>
              {isLoading && (
                <ActivityIndicator color={theme.colors.background_red} />
              )}
            </Footer>
          )}
          renderItem={renderItem}
          style={{
            width: '100%',
          }}
          onEndReached={() => {
            handleLoadOnEnd();
          }}
          ListEmptyComponent={
            !isLoading && data.totalElements === 0 ? (
              <ListEmptyComponent
                source={theme.images.notFound}
                title="Nenhum restaurante encontrado"
              />
            ) : null
          }
        />
      </Container>
    </>
  );
}
