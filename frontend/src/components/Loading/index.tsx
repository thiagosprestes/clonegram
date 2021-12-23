import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '~/styleguide';

import { Container } from './styles';

const Loading = () => (
  <Container>
    <ActivityIndicator color={colors.black} size={40} />
  </Container>
);

export default Loading;
