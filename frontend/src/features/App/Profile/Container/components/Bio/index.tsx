import React from 'react';
import Button, { ButtonType } from '~/components/Button';
import { TextType } from '~/components/Text';
import { useAppSelector } from '~/hooks/redux';

import { ButtonsContainer, Container, Description, Name } from './styles';

interface BioProps {
  bio?: string;
  name: string;
  onFollow: (userId: string) => void;
  onGoToUpdate: (userId: string) => void;
  userId: string;
}

const Bio = ({ bio, name, onFollow, onGoToUpdate, userId }: BioProps) => {
  const authenticatedUserId = useAppSelector(
    (state) => state.authReducer.userId
  );

  return (
    <Container>
      <Name type={TextType.bold} size={16}>
        {name}
      </Name>
      {bio && <Description>{bio}</Description>}
      <ButtonsContainer>
        {userId !== authenticatedUserId ? (
          <Button
            text='Seguir'
            onPress={() => onFollow(userId)}
            type={ButtonType.primary}
          />
        ) : (
          <Button
            text='Editar perfil'
            onPress={() => onGoToUpdate(userId)}
            type={ButtonType.secondary}
          />
        )}
      </ButtonsContainer>
    </Container>
  );
};

export default Bio;
