import React from 'react';
import {
  ArrowImage,
  Button,
  ButtonText,
  Container,
  Icon,
  IconPrivacyData,
  Wrapper,
} from './styles';

interface Props {
  onPress: () => void;
  sourceIcon?: string;
  name: string;
  sourceArrowIcon: string;
  privacyDataIcon: boolean;
  sourcePrivacyIcon?: string;
}

export function ProfilePageComponent({
  onPress,
  sourceIcon,
  name,
  sourceArrowIcon,
  privacyDataIcon,
  sourcePrivacyIcon,
}: Props) {
  return (
    <Container>
      <Button onPress={onPress}>
        {privacyDataIcon ? (
          <IconPrivacyData source={sourcePrivacyIcon} />
        ) : (
          <Icon source={sourceIcon} />
        )}
        <Wrapper>
          <ButtonText>{name}</ButtonText>
          <ArrowImage source={sourceArrowIcon} />
        </Wrapper>
      </Button>
    </Container>
  );
}
