import React from 'react';
import Button, { ButtonType } from '~/components/Button';
import { TextType } from '~/components/Text';
import { useAppSelector } from '~/hooks/redux';

import { ButtonsContainer, Container, Description, Name } from './styles';

interface BioProps {
  bio?: string;
  name: string;
  isFollowedByUser: boolean;
  onFollow: (userId: string) => void;
  onGoToUpdate: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  userId: string;
}

const Bio = ({
  bio,
  name,
  isFollowedByUser,
  onFollow,
  onGoToUpdate,
  onUnfollow,
  userId,
}: BioProps) => {
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
          <>
            {isFollowedByUser ? (
              <Button
                text='Seguindo'
                onPress={() => onUnfollow(userId)}
                type={ButtonType.secondary}
              />
            ) : (
              <Button
                text='Seguir'
                onPress={() => onFollow(userId)}
                type={ButtonType.primary}
              />
            )}
          </>
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
