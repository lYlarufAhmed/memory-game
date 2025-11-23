import { DashBoard, ResetBtn } from "../../StyledComponents";
import { GameStatus } from "../../types/game.types";

interface DashBoardProps {
  time: number;
  moves: number;
  score: number;
  status: GameStatus;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

import { formattedTime } from "../../utils/timing.utils";
import VictoryMessage from "../VictoryMessage";

const Dashboard = ({
  time,
  moves,
  score,
  status,
  onPause,
  onRestart,
  onResume,
}: DashBoardProps) => {
  return (
    <>
      <DashBoard>
        <span>Time: {formattedTime(time)}</span>
        <span>{moves} moves</span>
        <span>Score: {score}</span>
        <ResetBtn onClick={status == "playing" ? onPause : onResume}>
          {status == "playing" ? "Pause" : "Start"}
        </ResetBtn>
        {["playing", "paused"].includes(status) && (
          <ResetBtn onClick={onRestart}>Restart</ResetBtn>
        )}
      </DashBoard>
      {status == "completed" && (
        <VictoryMessage moves={moves} time={time} onPlayAgain={onResume} />
      )}
    </>
  );
};

export default Dashboard;
