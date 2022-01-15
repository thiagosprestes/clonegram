import styled from 'styled-components/native';
import Text from '~/components/Text';

export const Container = styled.View`
  padding: 0 12px;
`;

export const Name = styled(Text)`
  margin: 18px 0 8px;
`;

export const Description = styled(Text)`
  margin-bottom: 12px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
`;
