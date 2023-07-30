import utils from "./utils";

const StarsDisplay = (props: { stars: number }) => {
  return (
    <>
      {utils.range(1, props.stars).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
};

export default StarsDisplay;
