import styled from 'styled-components/native';
import Text from '~/components/Text';

export const Container = styled.View`
  padding: 0 12px;
`;

export const Picture = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 50px;
  margin-right: 5px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Column = styled.View`
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  flex: 1;
`;

export const Value = styled(Text)``;

export const Label = styled(Text)``;
