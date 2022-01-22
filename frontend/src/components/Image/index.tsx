import React from 'react';
import { StyleProp, ImageStyle } from 'react-native';
import { api } from '~/services/api';
import { ImageContainer } from './styles';

interface ImageComponentProps {
  isRounded?: boolean;
  imageSource: string;
  size: number;
  style?: StyleProp<ImageStyle>;
}

const ImageComponent = ({
  isRounded = false,
  imageSource,
  size,
  style,
}: ImageComponentProps) => (
  <ImageContainer
    source={{
      uri: `${api.defaults.baseURL}/images/${imageSource}`,
    }}
    size={size}
    isRounded={isRounded}
    style={style}
  />
);

export default ImageComponent;
