import { useEffect, useState } from "react";
import "./App.css";
import utils from "./utils";
import StarsDisplay from "./StarsDisplay";
import ResetGame from "./ResetGame";
import PlayNumber from "./PlayNumber";

function App(props: { startNewGame: () => void }) {
  const {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;

  const gameStatus =
    availableNumbers.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : "active";

  const numberStatus = (number: number) => {
    if (!availableNumbers.includes(number)) {
      return "used";
    } else if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number: number, numberStatus: string) => {
    if (gameStatus !== "active" || numberStatus === "used") {
      return;
    }

    const newCandidateNums =
      numberStatus === "available"
        ? candidateNumbers.concat(number)
        : candidateNumbers.filter((cn) => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <ResetGame onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay stars={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              numberStatus={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}

export default function StarMatch() {
  const [gameId, setGameID] = useState(1);
  return <App key={gameId} startNewGame={() => setGameID(gameId + 1)} />;
}

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums: number[]) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNumbers(newCandidateNums);
    } else {
      const newAvailableNums = availableNumbers.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNumbers(newAvailableNums);
      setCandidateNumbers([]);
    }
  };
  return {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState,
  };
};
