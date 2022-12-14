import React, {SetStateAction, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';

interface Props {
  childToParent: (childState: SetStateAction<number>) => void;
}

export function EvaluationBar({childToParent}: Props) {
  const [defaultRating, setDefaultRating] = useState<number>(0);
  const [maxRating] = useState([1, 2, 3, 4, 5]);

  const theme = useTheme();

  return (
    <View style={styles.ratingBarStyle}>
      {maxRating.map(item => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => {
              setDefaultRating(item);
              childToParent(item);
            }}>
            <Image
              style={styles.starImageStyle}
              source={
                item <= defaultRating
                  ? theme.images.star
                  : theme.images.starEmpty
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
});
