import { ReactElement, StrictMode } from "react";

import { Wrapper, GameWrapper } from "./StyledComponents";

import Dashboard from "./components/Dashboard/Dashboard";
import GameBoard from "./components/GameBoard/GameBoard";
import { useGame } from "./hooks/useGame";

function App(): ReactElement {
  // Call useGame ONCE here - single source of truth
  const gameState = useGame();

  return (
    <StrictMode>
      <Wrapper>
        <h4 className="text-black font-bold">Memory Game</h4>
        <Dashboard
          toggleGameRunning={gameState.toggleGameRunning}
          moves={gameState.moves}
          score={gameState.score}
          time={gameState.time}
          gameStatus={gameState.gameStatus}
          handlRestart={gameState.handlRestart}
        />
        <GameWrapper>
          <GameBoard
            handleCardClick={gameState.handleCardClick}
            matchedCards={gameState.matchedCards}
            flippedCards={gameState.flippedCards}
            cards={gameState.cards}
          />
        </GameWrapper>
      </Wrapper>
    </StrictMode>
  );
}

export default App;
