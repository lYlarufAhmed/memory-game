import { ReactElement, useEffect, useState } from "react";

import Icon from "./icons";
import { GameState } from "./types/game.types";
import {
  Wrapper,
  DashBoard,
  GameWrapper,
  ResetBtn,
  IconContainer,
  IconCover,
} from "./StyledComponents";

import { shuffleArray } from "./utils/array.utils";
import { formattedTime } from "./utils/timing.utils";
import { checkImages } from "./utils/game.utils";


let ICONS: number[];


ICONS = shuffleArray();

const initialState: GameState = {
  iconsIndexes: ICONS,
  moves: 0,
  time: 0,
  score: 0,
  clickedImages: [],
  showIndexes: [],
  lastClicked: NaN,
  status: "idle",
};

function App(): ReactElement {
  let [state, setState] = useState<GameState>(initialState);
  const toggleGameRunning = () =>
    setState((prev: GameState) =>
      prev.status == "completed"
        ? { ...initialState, status: "playing" }
        : {
            ...prev,
            // gameRunning: !prev.gameRunning,
            status: prev.status == "playing" ? "paused" : "playing",
          }
    );
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
        // let gameRunning = prev.gameRunning;
        // let ended = prev.ended;
        let status = prev.status;

        if (clickedImages.length === 2) {
          moves += 1;
          if (clickedImages[0].imgIndex === clickedImages[1].imgIndex) {
            score += 1;
            showIndexes = [...prev.showIndexes, clickedImages[0].imgIndex];
            if (showIndexes.length === 8) {
              // ended = true;
              status = "completed";
            }
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
          // ended,
          // gameRunning,
          status,
        };
      }
      return prev;
    });
  };

  const showResetButton = () =>
    state.status == "playing" || state.status == "paused";

  useEffect(() => {
    const timerHandler = setInterval(() => {
      if (state.showIndexes.length === 8 || state.status == "completed") {
        clearInterval(timerHandler);
        setState((prev) => ({
          ...prev,
          // ended: true,
          // gameRunning: false,
          status: "completed",
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
            time: prev.status == "playing" ? prev.time + 1 : prev.time,
            clickedImages,
            lastClicked,
          };
        });
    }, 1000);
    return () => clearInterval(timerHandler);
  }, [
    state.time,
    state.showIndexes.length,
    // state.gameRunning,
    // state.ended,
    state.status,
  ]);

  return (
    <Wrapper>
      <h4 className="text-black font-bold">Memory Game</h4>
      <DashBoard>
        <span>Time: {formattedTime(state.time)}</span>
        <span>{state.moves} moves</span>
        <span>Score: {state.score}</span>
        <ResetBtn onClick={toggleGameRunning}>
          {state.status == "playing" ? "Pause" : "Start"}
        </ResetBtn>
        {showResetButton() == true && (
          <ResetBtn
            onClick={() =>
              setState({
                ...initialState,
                iconsIndexes: shuffleArray(),
                // ended: false,
                // gameRunning: true,
                status: "playing",
              })
            }
          >
            Restart
          </ResetBtn>
        )}
      </DashBoard>
      {state.status == "completed" && (
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
            onClick={() =>
              state.status == "playing" ? clickHandler(index, i) : () => {}
            }
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
