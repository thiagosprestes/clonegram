import styled from 'styled-components/native';

interface ImageProps {
  size: number;
  isRounded: boolean;
}

export const ImageContainer = styled.Image<ImageProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => (props.isRounded ? '50px' : '0px')};
`;
