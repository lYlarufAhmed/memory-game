import React from "react";
import { isCardAlreadyClicked } from "../../utils/game.utils";
import Card from "../Card/Card";
import { useGame } from "../../hooks/useGame";


function GameBoard() {
  const { handleCardClick, matchedCards, flippedCards, cards } = useGame();
  return (
    <>
      {cards.map((i: number, index: number) => (
        <Card
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
