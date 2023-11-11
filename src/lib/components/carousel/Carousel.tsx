import React, { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";

export const Carousel: FC<Props> = ({ children, height, includeControls = true, pausable = true, slideTimer = 2000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex: number): void => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused || !pausable) {
        updateIndex(activeIndex + 1);
      }
    }, slideTimer);

    return () => {
      clearInterval(interval);
    };
  }, [paused, activeIndex]);

  return (
    <Container onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Inner style={{ transform: `translateX(-${activeIndex * 100}%)`, height: height }}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100vw" });
        })}
      </Inner>
      {includeControls && (
        <Indicators>
          <IndicatorButton onClick={() => updateIndex(activeIndex - 1)}>Prev</IndicatorButton>
          {React.Children.map(children, (child, index) => {
            if (index === activeIndex) {
              return <ActiveIndicatorButton onClick={() => updateIndex(index)}>{index + 1}</ActiveIndicatorButton>;
            }
            return <IndicatorButton onClick={() => updateIndex(index)}>{index + 1}</IndicatorButton>;
          })}
          <IndicatorButton onClick={() => updateIndex(activeIndex + 1)}>Next</IndicatorButton>
        </Indicators>
      )}
    </Container>
  );
};

type Props = {
  children: React.ReactElement[];
  height?: number | string;
  includeControls?: boolean;
  pausable?: boolean;
  slideTimer?: number;
};

const Container = styled.div`
  overflow: hidden;
`;

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  > button {
    margin: 5px;
  }
`;

const IndicatorButton = styled.button`
  background: none;
  border: none;
`;

const ActiveIndicatorButton = styled(IndicatorButton)`
  background-color: #ccc;
`;
