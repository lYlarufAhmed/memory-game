import { useGame } from "../../hooks/useGame";
import { DashBoard, ResetBtn } from "../../StyledComponents";

import { formattedTime } from "../../utils/timing.utils";
import VictoryMessage from "../VictoryMessage";

const Dashboard = () => {
  let {
    toggleGameRunning,
    moves,
    score,
    time,
    gameStatus,
    handlRestart,
  } = useGame();
  return (
    <>
      <DashBoard>
        <span>Time: {formattedTime(time)}</span>
        <span>{moves} moves</span>
        <span>Score: {score}</span>
        <ResetBtn onClick={toggleGameRunning}>
          {gameStatus == "playing" ? "Pause" : "Start"}
        </ResetBtn>
        {["playing", "paused"].includes(gameStatus) && (
          <ResetBtn onClick={handlRestart}>Restart</ResetBtn>
        )}
      </DashBoard>
      {gameStatus == "completed" && (
        <VictoryMessage
          moves={moves}
          time={time}
          onPlayAgain={toggleGameRunning}
        />
      )}
    </>
  );
};

export default Dashboard;
