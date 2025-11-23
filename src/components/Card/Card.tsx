import React from "react";
import { IconContainer, IconCover } from "../../StyledComponents";
import Icon from "../../icons";

interface CardProps {
  iconNumber: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Card = (props: CardProps) => {
  const { iconNumber, isFlipped, isMatched, onClick, disabled } = props;
  return (
    <IconContainer
      matched={isMatched}
      aria-disabled={disabled}
      disabled={disabled}
      key={iconNumber}
      onClick={onClick}
    >
      <Icon svgNo={iconNumber} />
      <IconCover show={isFlipped} />
    </IconContainer>
  );
};

export default Card;
