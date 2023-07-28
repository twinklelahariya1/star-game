import { useState } from "react";
import "./App.css";

function App() {
  const [stars, setStars] = useState(utils.random(1, 9));

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay stars={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber key={number} number={number} />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
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

const PlayNumber = (props: { number: number }) => {
  return (
    <button
      className="number"
      onClick={() => console.log("Clicked on the number : " + props.number)}
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
