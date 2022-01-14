import styled from 'styled-components/native';
import { colors } from '~/styleguide';
import Text from '../Text';

export const Container = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const User = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Picture = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 25px;
`;

export const UserInfo = styled.View`
  margin-left: 10px;
`;

export const Content = styled.Image`
  height: 375px;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View`
  padding: 9px 12px;
`;

export const Description = styled(Text)``;

export const Comments = styled.View`
  margin-top: 5px;
`;

export const SlidePositionNumber = styled(Text)`
  position: absolute;
  z-index: 1;
  right: 0;
  margin: 10px 15px;
  color: ${colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  border-radius: 50px;
`;

export const LikeHeartContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const DeletePostModal = styled.View`
  background-color: ${colors.white};
  border-radius: 8px;

  width: 230px;
`;

export const ModalTitle = styled(Text)`
  margin-bottom: 20px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${colors.lightGrey};
`;

export const ModalBody = styled.View`
  align-items: center;
  padding: 20px;
`;

export const Buttons = styled.View``;

export const Delete = styled(Text)`
  padding: 20px;
  align-self: center;
  color: ${colors.blue};
`;

export const Cancel = styled(Text)`
  padding: 20px;
  align-self: center;
`;
