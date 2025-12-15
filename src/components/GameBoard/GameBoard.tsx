import React from "react";
import { isCardAlreadyClicked } from "../../utils/game.utils";
import Card from "../Card/Card";
import { Card as CardType } from "../../types/game.types";

interface GameBoardProps {
  handleCardClick: (index: number, imgIndex: number) => void;
  matchedCards: number[];
  flippedCards: CardType[];
  cards: number[];
}

function GameBoard(props: GameBoardProps) {
  const { handleCardClick, matchedCards, flippedCards, cards } = props;

  return (
    <>
      {cards.map((i: number, index: number) => (
        <Card
          key={`${i}-${index}`}
          iconNumber={i}
          isFlipped={
            isCardAlreadyClicked(flippedCards, {
              index,
              imgIndex: i,
            }) || matchedCards.includes(i)
          }
          isMatched={matchedCards.includes(i)}
          onClick={() => handleCardClick(index, i)}
          disabled={false}
        />
      ))}
    </>
  );
}

export default GameBoard;
