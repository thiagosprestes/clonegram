import styled from 'styled-components/native';
import ImageComponent from '~/components/Image';
import { Container as SafeAreaView } from '~/components/SafeAreaView/styles';
import { colors } from '~/styleguide';

export const Container = styled(SafeAreaView)`
  padding: 0 20px;
  margin: 0;
`;

export const ProfilePicture = styled(ImageComponent)``;
