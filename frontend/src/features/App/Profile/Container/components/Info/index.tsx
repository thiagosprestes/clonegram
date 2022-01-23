import React from 'react';
import { TextType } from '~/components/Text';
import { api } from '~/services/api';
import { colors } from '~/styleguide';
import profile from '~/assets/profile.png';

import { Column, Container, Label, Picture, Row, Value } from './styles';

interface ValueAndLabelProps {
  value: string | number;
  label: string;
  onPress?: () => void;
}

interface InfoProps {
  followers: number;
  following: number;
  onGoToFollowers: () => void;
  onGoToFollowing: () => void;
  posts: number;
  profilePicture: string;
}

const Info = ({
  followers,
  following,
  onGoToFollowers,
  onGoToFollowing,
  posts,
  profilePicture,
}: InfoProps) => {
  const ValueAndLabel = ({ value, label, onPress }: ValueAndLabelProps) => (
    <Column onPress={onPress}>
      <Value type={TextType.bold} size={20}>
        {value}
      </Value>
      <Label color={colors.lightGreyText} numberOfLines={1}>
        {label}
      </Label>
    </Column>
  );

  return (
    <Container>
      <Row>
        <Picture
          source={
            profilePicture
              ? {
                  uri: `${api.defaults.baseURL}/images/${profilePicture}`,
                }
              : profile
          }
        />
        <Row>
          <ValueAndLabel value={posts} label='Publicações' />
          <ValueAndLabel
            value={followers}
            label='Seguidores'
            onPress={onGoToFollowers}
          />
          <ValueAndLabel
            value={following}
            label='Seguindo'
            onPress={onGoToFollowing}
          />
        </Row>
      </Row>
    </Container>
  );
};

export default Info;
