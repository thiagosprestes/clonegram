import styled from 'styled-components/native';
import { colors, fonts } from '~/styleguide';
import Text from '~/components/Text';
import ImageComponent from '~/components/Image';

interface SendCommentTextProps {
  isDisabled: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

export const Input = styled.TextInput`
  font-family: ${fonts.regular};
  border-radius: 7px;
  margin-bottom: 10px;
  padding: 10px;
  color: ${(props) => props.theme.colors.inputText};
  flex: 1;
`;

export const AddCommentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
`;

export const UserPicture = styled(ImageComponent)`
  border-radius: 50px;
  margin-right: 10px;
`;

export const SendComment = styled.TouchableOpacity``;

export const SendCommentText = styled(Text)<SendCommentTextProps>`
  color: ${colors.blue};
  opacity: ${(props) => (props.isDisabled ? 0.6 : 1)};
`;
