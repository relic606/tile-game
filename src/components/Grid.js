import React from "react";
import Square from "./Square";

class Grid extends React.Component {
  state = {
    gridWidth: this.props.gridWidth,
    // selectedSquare: [0, 0],
    selectedSquare: { x: 0, y: 0 },
  };

  makeSquares = () => {
    const tiles = [
      "red",
      "red",
      "red",
      // "yellow",
      "yellow",
      "green",
      "green",
      "green",
      "green",
      "green",
      "green",
      // "blue",
      // "blue", "yellow", "purple",
      // "green"
    ];
    let arr = [];
    let key = 0;
    for (let i = 0; i < this.props.gridWidth; i++) {
      for (let j = 0; j < this.props.gridWidth; j++) {
        arr.push(
          <Square
            isHiddenToggle={this.props.eventIsHiddenToggle}
            eventIsHidden={this.props.eventIsHidden}
            dungeonFloor={this.props.dungeonFloor}
            gridWidth={this.props.gridWidth}
            inCombat={this.props.inCombat}
            x={j}
            y={i}
            key={key++}
            tile={tiles[Math.floor(Math.random() * tiles.length)]}
            selectedSquare={this.state.selectedSquare}
          />
        );
      }
    }
    return arr;
  };

  handleKeyPress = (e) => {
    if (!this.props.inCombat && this.props.eventIsHidden) {
      switch (e.which) {
        case 87:
          this.move(0, 1, e);
          break;
        case 68:
          this.move(1, 1, e);
          break;
        case 83:
          this.move(0, -1, e);
          break;
        case 65:
          this.move(1, -1, e);
          break;
      }
    }
  };

  move = (dir, change, e) => {
    // let coords = this.state.selectedSquare;
    let coords = [this.state.selectedSquare.x, this.state.selectedSquare.y];
    console.log(coords, dir, change);

    if (
      coords[dir] + change > -1 &&
      coords[dir] + change < this.props.gridWidth
    ) {
      coords[dir] += change;

      //Performs movement above, and then searches for the newly "selected" square below

      setTimeout(() => {
        // console.log(e.target)
        const selectedSqrElem = e.target.getElementsByClassName("selected");
        if (selectedSqrElem[0].className.includes("red")) {
          alert("Combat Engaged!");
          this.props.inCombatChange(true);
          this.props.setEnemy(
            this.props.enemyPool[
              Math.floor(Math.random() * this.props.enemyPool.length)
            ]
          );
        } else if (selectedSqrElem[0].className.includes("yellow")) {
          alert("Event Square!");
          this.props.eventIsHiddenToggle();
        } else if (selectedSqrElem[0].className.includes("black")) {
          this.props.setBossFight(true);
          this.props.setEnemy(this.props.boss);
          alert("Boss battle!");
          this.props.inCombatChange(true);
          this.setState({ selectedSquare: { x: 0, y: 0 } });
        }
      }, 10);

      ///////need minor timout delay for character to visually move before ineracting with square
    }
    this.setState({
      selectedSquare: { x: coords[0], y: coords[1] },
    });
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeyPress);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyPress);
  };

  render() {
    return (
      <div
        className="grid-box"
        style={{
          width: this.props.gridWidth * 150,
          height: this.props.gridWidth * 150,
        }}
      >
        <div>{this.makeSquares()}</div>
      </div>
    );
  }
}

export default Grid;
