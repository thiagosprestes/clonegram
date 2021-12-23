import styled from "styled-components/native";
import Text from "~/components/Text";
import { colors, fonts } from "~/styleguide";

interface LoginButtonProps {
  isDisabled: boolean;
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 30px;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 30px;
  align-self: center;
  height: 60px;
`;

export const LoginForm = styled.View``;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.input};
  font-family: ${fonts.regular};
  border-radius: 7px;
  margin-bottom: 10px;
  padding: 15px;
  color: ${(props) => props.theme.colors.inputText};
`;

export const ForgotPassword = styled(Text)`
  text-align: center;
  font-family: ${fonts.bold};
  color: ${colors.blue};
  margin-top: 15px;
`;

export const LoginButton = styled.TouchableOpacity<LoginButtonProps>`
  background-color: ${colors.blue};
  border-radius: 7px;
  padding: 15px;
  align-items: center;
  opacity: ${(props) => (props.isDisabled ? 0.6 : 1)};
`;

export const LoginButtonText = styled(Text)`
  color: ${colors.white};
`;

export const DarkModeToggle = styled.TouchableOpacity`
  align-self: center;
  justify-content: flex-end;
  margin-top: 50px;
`;

export const ModalContainer = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  width: 180px;
  border-radius: 8px;
`;

export const ModalBody = styled.View`
  padding: 15px;
  align-items: center;
`;

export const ModalTitle = styled(Text)`
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;
`;

export const ModalContent = styled(Text)`
  text-align: center;
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const ModalFooter = styled.View``;

export const ModalButton = styled.TouchableOpacity`
  padding: 10px 0;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.input};
`;

export const ModalButtonText = styled(Text)`
  color: ${(props) => props.theme.colors.textPrimary};
`;
