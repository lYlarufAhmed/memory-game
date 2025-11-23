import { ReactElement, useEffect, useState } from "react";

import { GameState } from "./types/game.types";
import { Wrapper, GameWrapper } from "./StyledComponents";

import { shuffleArray } from "./utils/array.utils";
import { isCardAlreadyClicked } from "./utils/game.utils";
import Card from "./components/Card/Card";
import Dashboard from "./components/Dashboard/Dashboard";

const initialState: GameState = {
  iconsIndexes: shuffleArray(),
  moves: 0,
  time: 0,
  score: 0,
  clickedCards: [],
  showIndexes: [],
  lastClicked: NaN,
  status: "idle",
};

function App(): ReactElement {
  let [state, setState] = useState<GameState>(initialState);
  const toggleGameRunning = () =>
    setState((prev: GameState) =>
      prev.status == "completed"
        ? { ...initialState, status: "playing", iconsIndexes: shuffleArray() }
        : {
            ...prev,
            // gameRunning: !prev.gameRunning,
            status: prev.status == "playing" ? "paused" : "playing",
          }
    );
  const clickHandler = (index: number, imgIndex: number) => {
    setState((prev) => {
      let clickedImages =
        prev.clickedCards.length > 1
          ? [{ index, imgIndex }]
          : [...prev.clickedCards, { index, imgIndex }];

      let lastClicked = prev.clickedCards.length > 1 ? NaN : prev.lastClicked;
      let moves = prev.moves;
      let score = prev.score;
      let showIndexes = prev.showIndexes;
      let status = prev.status;

      if (clickedImages.length === 2) {
        moves += 1;
        if (clickedImages[0].imgIndex === clickedImages[1].imgIndex) {
          score += 1;
          showIndexes = [...prev.showIndexes, clickedImages[0].imgIndex];
          if (showIndexes.length === 8) {
            status = "completed";
          }
        }
        lastClicked = new Date().getTime();
      }

      return {
        ...prev,
        clickedCards: clickedImages,
        lastClicked, // to flip the images after a certain time
        moves,
        score,
        showIndexes,
        status,
      };
    });
  };
  useEffect(() => {
    const timerHandler = setInterval(() => {
      if (state.showIndexes.length === 8 || state.status == "completed") {
        clearInterval(timerHandler);
        setState((prev) => ({
          ...prev,
          status: "completed",
        }));
      } else
        setState((prev) => {
          let currTime = new Date().getTime();
          let clickDiff =
            prev.lastClicked > 0 ? currTime - prev.lastClicked : NaN;
          //   console.log("click diff", clickDiff);

          let clickedImages = prev.clickedCards;
          let lastClicked = prev.lastClicked;

          // after 2.5 sec flip the open images automatically.
          if (clickDiff > 2500 && prev.clickedCards.length === 2) {
            clickedImages = [];
            lastClicked = NaN;
          }

          return {
            ...prev,
            time: prev.status == "playing" ? prev.time + 1 : prev.time,
            clickedCards: clickedImages,
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
      <Dashboard
        moves={state.moves}
        score={state.score}
        time={state.time}
        status={state.status}
        onPause={toggleGameRunning}
        onResume={toggleGameRunning}
        onRestart={() =>
          setState({
            ...initialState,
            iconsIndexes: shuffleArray(),
            status: "playing",
          })
        }
      />

      <GameWrapper>
        {state.iconsIndexes.map((i: number, index: number) => (
          <Card
            iconNumber={i}
            isFlipped={
              isCardAlreadyClicked(state.clickedCards, {
                index,
                imgIndex: i,
              }) || state.showIndexes.includes(i)
            }
            isMatched={state.showIndexes.includes(i)}
            onClick={() =>
              state.status == "playing" ? clickHandler(index, i) : () => {}
            }
            disabled={false}
          />
        ))}
      </GameWrapper>
    </Wrapper>
  );
}

export default App;
