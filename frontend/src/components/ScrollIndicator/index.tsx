import React, { useEffect, useState } from 'react';

import { Container, IndicatorItem } from './styles';

interface ScrollIndicatorProps {
  itemsLenght: number;
  carouselPosition: number;
}

const ScrollIndicator = ({
  itemsLenght,
  carouselPosition,
}: ScrollIndicatorProps) => {
  const [indicators, setIndicators] = useState<number[]>([]);

  const onRenderIndicators = () => {
    for (let item = 0; item < itemsLenght; item++) {
      setIndicators((oldState) => [...oldState, item + 1]);
    }
  };

  useEffect(() => {
    setIndicators([]);
    onRenderIndicators();
  }, []);

  const sliceBegin = carouselPosition >= 6 ? 4 : 0;
  const sliceEnd =
    carouselPosition >= 6 ? itemsLenght : itemsLenght <= 5 ? itemsLenght : 6;

  const onDefineIndicatorsOffset = (position: number) => {
    switch (position) {
      case 0:
        return carouselPosition > 5 ? 5 : 6;
      case 5:
        return carouselPosition < 6 ? 5 : 6;
      default:
        return 6;
    }
  };

  return (
    <Container>
      {indicators.slice(sliceBegin, sliceEnd).map((item, index) => (
        <IndicatorItem
          key={item}
          size={onDefineIndicatorsOffset(index)}
          active={item === carouselPosition}
        />
      ))}
    </Container>
  );
};

export default ScrollIndicator;
