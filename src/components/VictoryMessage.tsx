import { formattedTime } from "../utils/timing.utils";

interface VictoryMessageProps {
  moves: number;
  time: number;
  onPlayAgain: () => void;
}

const VictoryMessage = ({ moves, time, onPlayAgain }: VictoryMessageProps) => {
  return (
    <b>
      Congratulations! You won in {moves} moves! You took {formattedTime(time)}!
    </b>
  );
};

export default VictoryMessage;
