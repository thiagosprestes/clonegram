import React from 'react';
import { TextType } from '~/components/Text';
import { api } from '~/services/api';
import { colors } from '~/styleguide';

import { Column, Container, Label, Picture, Row, Value } from './styles';

interface ValueAndLabelProps {
  value: string | number;
  label: string;
}

interface InfoProps {
  followers: number;
  following: number;
  posts: number;
  profilePicture: string;
}

const Info = ({ followers, following, posts, profilePicture }: InfoProps) => {
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
            uri: `${api.defaults.baseURL}/images/${profilePicture}`,
          }}
        />
        <Row>
          <ValueAndLabel value={posts} label='Publicações' />
          <ValueAndLabel value={followers} label='Seguidores' />
          <ValueAndLabel value={following} label='Seguindo' />
        </Row>
      </Row>
    </Container>
  );
};

export default Info;
