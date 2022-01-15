import styled from 'styled-components/native';
import { Container as SafeAreaView } from '~/components/SafeAreaView/styles';
import Text from '~/components/Text';
import { colors } from '~/styleguide';

interface OptionProps {
  isSelected: boolean;
}

export const Container = styled(SafeAreaView)`
  margin: 0;
`;

export const Header = styled.View`
  padding: 12px 20px;
`;

export const Username = styled(Text)``;

export const ProfilePostOptions = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const Option = styled.View<OptionProps>`
  flex: 1;
  align-items: center;
  padding: 10px 0px;
  border-bottom-width: ${(props) => (props.isSelected ? '2px' : '0px')};
  border-color: ${colors.black};
`;

export const Posts = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
  border-top-color: ${colors.lightGrey};
  border-top-width: 1px;
`;
