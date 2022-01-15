import React from 'react';
import { api } from '~/services/api';
import { ImageContainer } from './styles';

interface ImageComponentProps {
  isRounded?: boolean;
  imageSource: string;
  size: number;
}

const ImageComponent = ({
  isRounded = false,
  imageSource,
  size,
}: ImageComponentProps) => (
  <ImageContainer
    source={{
      uri: `${api.defaults.baseURL}/images/${imageSource}`,
    }}
    size={size}
    isRounded={isRounded}
  />
);

export default ImageComponent;
