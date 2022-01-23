import styled from 'styled-components/native';
import { Container as SafeAreaView } from '~/components/SafeAreaView/styles';
import Text from '~/components/Text';
import { colors } from '~/styleguide';

export const Container = styled(SafeAreaView)`
  padding: 20px;
  flex: 1;
`;

export const ModalContent = styled.View`
  background-color: ${colors.white};
  border-radius: 20px;
`;

export const ModalBody = styled.View`
  padding: 20px;
`;

export const ModalTitle = styled(Text)`
  align-self: center;
`;

export const ModalDescription = styled(Text)`
  color: ${colors.darkGrey};
`;

export const ModalButton = styled.TouchableOpacity`
  border-top-width: 1px;
  border-top-color: ${colors.lightGrey};
  padding: 16px;
  align-items: center;
`;

export const ModalButtonText = styled(Text)`
  color: ${colors.blue};
`;
