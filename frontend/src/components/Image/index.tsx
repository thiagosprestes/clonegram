import React from 'react';
import { api } from '~/services/api';
import { ImageContainer } from './styles';

interface ImageComponentProps {
  imageSource: string;
  size: number;
}

const ImageComponent = ({ imageSource, size }: ImageComponentProps) => (
  <ImageContainer
    source={{
      uri: `${api.defaults.baseURL}/images/${imageSource}`,
    }}
    size={size}
  />
);

export default ImageComponent;
