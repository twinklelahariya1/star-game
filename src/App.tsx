import { useEffect, useState } from "react";
import "./App.css";

function App() {
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

  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;

  const gameStatus =
    availableNumbers.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : "active";

  const resetGameValues = () => {
    setStars(utils.random(1, 9));
    setAvailableNumbers(utils.range(1, 9));
    setCandidateNumbers([]);
    setSecondsLeft(10);
  };

  const numberStatus = (number: number) => {
    if (!availableNumbers.includes(number)) {
      return "used";
    } else if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number: number, numberStatus: string) => {
    if (gameStatus!=='active' || numberStatus === "used") {
      return;
    }

    const newCandidateNums =
      numberStatus === "available"
        ? candidateNumbers.concat(number)
        : candidateNumbers.filter((cn) => cn !== number);

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

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <ResetGame onClick={resetGameValues} gameStatus={gameStatus} />
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

export default App;

const StarsDisplay = (props: { stars: number }) => {
  return (
    <>
      {utils.range(1, props.stars).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
};

const ResetGame = (props: { onClick: () => void; gameStatus: string }) => {
  return (
    <div className="replay-game">
      <div
        className="message"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
      >
        {props.gameStatus === "lost" ? "Game Over" : "Won"}
      </div>
      <button onClick={props.onClick}> Play Again </button>
    </div>
  );
};

const PlayNumber = (props: {
  numberStatus: string;
  number: number;
  onClick: (numbner: number, numberType: string) => void;
}) => {
  return (
    <button
      className="number"
      style={{ backgroundColor: (colors as any)[props.numberStatus] }}
      onClick={() => props.onClick(props.number, props.numberStatus)}
    >
      {props.number}
    </button>
  );
};

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

// Math science
const utils = {
  // Sum an array
  sum: (arr: number[]) =>
    arr.reduce((acc: number, curr: number) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min: number, max: number) =>
    Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min: number, max: number) =>
    min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr: number[], max: number) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        console.log(arr[i]);
        const candidateSet = sets[j].concat(arr[i] as any);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};
