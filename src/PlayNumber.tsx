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

export default PlayNumber;
