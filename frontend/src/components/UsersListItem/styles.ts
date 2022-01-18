import styled from 'styled-components/native';
import Text from '~/components/Text';
import { colors } from '~/styleguide';

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: row;
  align-items: center;
`;

export const UserPicture = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50px;
`;

export const Username = styled(Text)``;

export const Follow = styled.TouchableOpacity`
  margin-left: auto;
  background-color: ${colors.blue};
  padding: 6px 24px;
  border-radius: 4px;
`;

export const Following = styled.TouchableOpacity`
  margin-left: auto;
  background-color: ${colors.white};
  padding: 6px 24px;
  border-radius: 4px;
  border: 1px solid ${colors.darkGreyText};
`;
