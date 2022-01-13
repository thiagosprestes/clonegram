import React from 'react';

import { Container } from './styles';

interface SafeAreaViewProps {
  children: React.ReactNode;
}

const SafeAreaView = ({ children }: SafeAreaViewProps) => {
  return <Container>{children}</Container>;
};

export default SafeAreaView;
