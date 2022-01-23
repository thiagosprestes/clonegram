import React from 'react';
import { StyleProp, ImageStyle } from 'react-native';
import { api } from '~/services/api';
import { ImageContainer } from './styles';
import profile from '~/assets/profile.png';

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
    source={
      imageSource
        ? {
            uri: `${api.defaults.baseURL}/images/${imageSource}`,
          }
        : profile
    }
    size={size}
    isRounded={isRounded}
    style={style}
  />
);

export default ImageComponent;
