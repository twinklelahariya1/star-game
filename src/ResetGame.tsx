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

  export default ResetGame;