import styled from 'styled-components/native';
import ImageComponent from '~/components/Image';
import Text from '~/components/Text';
import { colors } from '~/styleguide';

interface CommentItemProps {
  isDescription: boolean;
}

export const Container = styled.View<CommentItemProps>`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  border-bottom-width: ${(props) => (props.isDescription ? 1 : 0)}px;
  border-bottom-color: ${colors.lightGrey};
`;

export const PostUserProfilePicture = styled(ImageComponent)`
  border-radius: 50px;
`;

export const Description = styled(Text)`
  flex: 1;
  margin-left: 3px;
`;
