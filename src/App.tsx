import { ReactElement, useEffect, useState } from "react";

import { Wrapper, GameWrapper } from "./StyledComponents";

import Dashboard from "./components/Dashboard/Dashboard";
import GameBoard from "./components/GameBoard/GameBoard";

function App(): ReactElement {
  return (
    <Wrapper>
      <h4 className="text-black font-bold">Memory Game</h4>
      <Dashboard />
      <GameWrapper>
        <GameBoard />
      </GameWrapper>
    </Wrapper>
  );
}

export default App;
