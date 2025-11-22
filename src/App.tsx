import { ReactElement, useEffect, useState } from "react";

import Icon from "./icons";
import {
  Wrapper,
  DashBoard,
  GameWrapper,
  ResetBtn,
  IconContainer,
  IconCover,
} from "./StyledComponents";

let ICONS: number[];

const getShuffledArr = () => {
  let arr: number[] = [];
  for (let i = 1; i < 17; i++) {
    arr.push(i > 8 ? i - 8 : i);
  }
  arr.sort(() => Math.random() - Math.random());
  return arr;
};
type Image = {
  index: number;
  imgIndex: number;
};
type State = {
  iconsIndexes: number[];
  moves: number;
  time: number;
  score: number;
  gameRunning: boolean;
  clickedImages: Image[];
  showIndexes: number[];
  lastClicked: number;
  ended: boolean;
};
const formattedTime = (secs: number) =>
  `${Math.floor(secs / 60)}m ${secs % 60}s`;
const checkImages = (clickedImages: Image[], index: number, imgIndex: number) =>
  clickedImages.filter(
    (obj) => obj.index === index && obj.imgIndex === imgIndex
  ).length === 1;
ICONS = getShuffledArr();

const initialState: State = {
  iconsIndexes: ICONS,
  moves: 0,
  time: 0,
  score: 0,
  gameRunning: false,
  clickedImages: [],
  showIndexes: [],
  lastClicked: NaN,
  ended: false,
};

function App(): ReactElement {
  let [state, setState] = useState(initialState);
  const toggleGameRunning = () =>
    setState((prev) => ({ ...prev, gameRunning: !prev.gameRunning }));
  const clickHandler = (index: number, imgIndex: number) => {
    setState((prev) => {
      if (!checkImages(prev.clickedImages, index, imgIndex)) {
        let clickedImages =
          prev.clickedImages.length > 1
            ? [{ index, imgIndex }]
            : [...prev.clickedImages, { index, imgIndex }];

        let lastClicked =
          prev.clickedImages.length > 1 ? NaN : prev.lastClicked;
        let moves = prev.moves;
        let score = prev.score;
        let showIndexes = prev.showIndexes;
        let gameRunning = prev.gameRunning;
        let ended = prev.ended;

        if (clickedImages.length === 2) {
          moves += 1;
          if (clickedImages[0].imgIndex === clickedImages[1].imgIndex) {
            score += 1;
            showIndexes = [...prev.showIndexes, clickedImages[0].imgIndex];
            if (showIndexes.length === 8) ended = true;
          }
          lastClicked = new Date().getTime();
        }

        return {
          ...prev,
          clickedImages,
          lastClicked, // to flip the images after a certain time
          moves,
          score,
          showIndexes,
          ended,
          gameRunning,
        };
      }
      return prev;
    });
  };

  useEffect(() => {
    const timerHandler = setInterval(() => {
      if (state.showIndexes.length === 8 || state.ended) {
        clearInterval(timerHandler);
        setState((prev) => ({
          ...prev,
          ended: true,
          gameRunning: false
        }));
      } else
        setState((prev) => {
          let currTime = new Date().getTime();
          let clickDiff =
            prev.lastClicked > 0 ? currTime - prev.lastClicked : NaN;
        //   console.log("click diff", clickDiff);

          let clickedImages = prev.clickedImages;
          let lastClicked = prev.lastClicked;

          // after 2.5 sec flip the open images automatically.
          if (clickDiff > 2500 && prev.clickedImages.length === 2) {
            clickedImages = [];
            lastClicked = NaN;
          }

          return {
            ...prev,
            time: prev.gameRunning ? prev.time + 1 : prev.time,
            clickedImages,
            lastClicked,
          };
        });
    }, 1000);
    return () => clearInterval(timerHandler);
  }, [state.time, state.showIndexes.length, state.gameRunning, state.ended]);
  return (
    <Wrapper>
      <h4>Memory Game</h4>
      <DashBoard>
        <span>Time: {formattedTime(state.time)}</span>
        <span>{state.moves} moves</span>
        <span>Score: {state.score}</span>
        <ResetBtn onClick={toggleGameRunning}>
          {state.gameRunning ? "Pause" : "Start"}
        </ResetBtn>
        <ResetBtn
          onClick={() =>
            setState({
              ...initialState,
              iconsIndexes: getShuffledArr(),
              ended: false,
              gameRunning: true
            })
          }
        >
          Restart
        </ResetBtn>
      </DashBoard>
      {state.ended && (
        <b>
          Congratulations! You won in {state.moves} moves! You took{" "}
          {formattedTime(state.time)}!
        </b>
      )}

      <GameWrapper>
        {ICONS.map((i: number, index: number) => (
          <IconContainer
            matched={state.showIndexes.includes(i)}
            key={index}
            onClick={() => clickHandler(index, i)}
          >
            <Icon svgNo={i} />
            <IconCover
              show={
                checkImages(state.clickedImages, index, i) ||
                state.showIndexes.includes(i)
              }
            />
          </IconContainer>
        ))}
      </GameWrapper>
    </Wrapper>
  );
}

export default App;
