

import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../global/Context';
import { useFetch } from '../../global/services/get';
import { BannerImage } from './styles';

interface BannerProps {
  src: string;
  onPressed: Function;
}

interface Photos {
    id: number;
    code: string;
}

export function Banner({ src, onPressed }: BannerProps) {
  const theme = useTheme();

  const { token } = useAuth();

  const [photos, setPhotos] = useState<Photos[]>([]);

  function onSuccessLoad(data?: any) {
    setPhotos([...photos, ...(data as Photos[])]);
  }

  useEffect(() => {
    (async () => await fetchData(onSuccessLoad))();
  }, []);

  const { data, fetchData } = useFetch<Photos>(src, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <TouchableOpacity onPress={() => onPressed()} activeOpacity={0.9}>
      <BannerImage
        source={data.code ? { uri: `${data.code}` } : theme.images.noImage}
        resizeMode='stretch'
      />
    </TouchableOpacity>
  );
}
