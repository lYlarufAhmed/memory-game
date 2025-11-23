import { Card } from "../types/game.types";


export const isCardAlreadyClicked = (clickedCards: Card[], card: Card) => clickedCards.filter(
    (obj) => obj.index === card.index && obj.imgIndex === card.imgIndex
).length === 1;
