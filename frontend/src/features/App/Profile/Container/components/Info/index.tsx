import React from 'react';
import { TextType } from '~/components/Text';
import { colors } from '~/styleguide';

import { Column, Container, Label, Picture, Row, Value } from './styles';

interface ValueAndLabelProps {
  value: string;
  label: string;
}

const Info: React.FC = () => {
  const ValueAndLabel = ({ value, label }: ValueAndLabelProps) => (
    <Column>
      <Value type={TextType.bold} size={20}>
        {value}
      </Value>
      <Label color={colors.lightGreyText}>{label}</Label>
    </Column>
  );

  return (
    <Container>
      <Row>
        <Picture
          source={{
            uri: 'https://i2.wp.com/sociedadejedi.com.br/wp-content/uploads/2019/11/mandalorian6.jpeg?fit=700%2C394&ssl=1',
          }}
        />
        <Row>
          <ValueAndLabel value='12345' label='Publicações' />
          <ValueAndLabel value='12345' label='Seguidores' />
          <ValueAndLabel value='12345' label='Seguindo' />
        </Row>
      </Row>
    </Container>
  );
};

export default Info;
