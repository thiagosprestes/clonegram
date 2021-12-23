import styled from 'styled-components/native';
import { colors } from '~/styleguide';

interface IndicatorItemProps {
  size: number;
  active: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IndicatorItem = styled.View<IndicatorItemProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) =>
    props.active ? colors.blue : props.theme.colors.inputText};
  border-radius: 50px;
  margin-right: 5px;
`;
