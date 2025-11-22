import { Card } from "../types/game.types";


export const checkImages = (clickedImages: Card[], index: number, imgIndex: number) => clickedImages.filter(
  (obj) => obj.index === index && obj.imgIndex === imgIndex
).length === 1;
