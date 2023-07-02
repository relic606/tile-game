import React, { useEffect, useState } from "react";

export default function Square(props) {
  const [tile, setTile] = useState(props.tile);

  ///// resets the selected non-green square to green after landing on it
  useEffect(() => {
    if (
      props.selectedSquare.x === props.x &&
      props.selectedSquare.y === props.y
    ) {
      setTile("green");
    }
  }, [props.inCombat, props.eventIsHidden]);

  useEffect(() => {
	
  })

  ///Sets initial square to green

  if (props.x === 0 && props.y === 0) {
    return (
      <div
        className={
          props.selectedSquare.x === props.x &&
          props.selectedSquare.y === props.y
            ? `selected square green`
            : `square green`
        }
      ></div>
    );

    //////// boss tile in opposite corner of player
  } else if (
    props.x === props.gridWidth - 1 &&
    props.y === props.gridWidth - 1
  ) {
    return (
      <div
        className={
          props.selectedSquare.x === props.x &&
          props.selectedSquare.y === props.y
            ? `selected square black`
            : `square black`
        }
      ></div>
    );
  }

  //Randomizes colors of remaining squares
  else {
    return (
      <div
        className={
          props.selectedSquare.x === props.x &&
          props.selectedSquare.y === props.y
            ? `selected square ${tile}`
            : `square ${tile}`
        }
      ></div>
    );
  }
}
