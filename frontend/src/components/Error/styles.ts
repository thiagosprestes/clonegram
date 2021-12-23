import styled from 'styled-components/native';
import { colors } from '~/styleguide';
import Text from '../Text';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.black};
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 30px;
`;

export const ButtonText = styled(Text)`
  color: ${colors.white};
`;
