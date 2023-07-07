import React from "react";
import swordImg from "../assets/sword.png";
import shieldImg from "../assets/shield.png";
import heartImg from "../assets/heart.png";
import drawImg from "../assets/cards1.png";
import moveImg from "../assets/wasd.png";
import waterImg from "../assets/water.png";

export default function PlayerStats(props) {
  const resourceCheck = (skill) => {
    switch (skill.actionType) {
      case "attack":
        return swordImg;
      case "defend":
        return shieldImg;
      case "heal":
        return heartImg;
      case "strength buff":
        return heartImg;
      case "draw":
        return drawImg;
      default:
    }
  };
  const { player } = props;
  return (
    <div className="player-stats-container">
      <div className="player-stats-top-section">
        <div className="player-stat-numbers">
          <h3>Player Stats</h3>
          <ul>
            <li>Dungeon Level: {props.dungeonFloor}</li>
            <li>Player Level: {player.level}</li>
            <li>
              Experience: {player.experience} / {player.expToNextLevel}
            </li>
            <li>Strength: {player.strength}</li>
            <li>Wisdom: {player.wisdom}</li>
            <li>
              Health: {player.health} / {player.maxHealth}
            </li>
          </ul>
        </div>
        <div className="game-info">
          <h3>Map Info</h3>
          <div className="movement-info">
            <p>Move around the tile-map with </p>{" "}
            <img src={moveImg} alt="WASD_image"></img>
          </div>
          <h4>Tiles</h4>
          <ul className="tile-list">
            <li>
              <div
                className="tile-example"
                style={{ backgroundColor: "#237031" }}
              ></div>
              <p>Safe</p>
            </li>
            <li>
              <div
                className="tile-example"
                style={{ backgroundColor: "#ba1446" }}
              ></div>
              <p>Regular Enemy</p>
            </li>
            <li>
              <div
                className="tile-example"
                style={{ backgroundColor: "#d39e17" }}
              ></div>
              <p>Event</p>
            </li>
            <li>
              <div
                className="tile-example"
                style={{ backgroundColor: "black" }}
              ></div>
              <p>Boss Enemy - Advance Dungeon Level</p>
            </li>
          </ul>
        </div>
        <div className="player-stats-combat">
          <h3>Combat</h3>
          <p>
            Play cards to generate one of four resources{" "}
            <img src={swordImg}></img>
            <img src={heartImg}></img>
            <img src={shieldImg}></img>
            <img src={drawImg}></img>
          </p>
          <p>Activate Combat Skills with the resources generated</p>
          <p>Draw 2 cards at start of player's next turn</p>
          <p>Enemy takes their action between player turns</p>
          <h4>Status Effects</h4>
          <ul>
            <li>Vulnerable - Receive 50% increased damage</li>
            <li>Weakness - Deal 40% reduced damage</li>
            <li>Slow - Only 1 card drawn at the start of your turn</li>
            <li>Stun - Player cannot take action</li>
          </ul>
          <p>
            Play cards with <img src={waterImg}></img> to clear all Status
            Effects
          </p>
        </div>
      </div>
      <h3>Combat Skills</h3>
      <ul className="player-skill-list">
        {player.skills.map((skill) => {
          const resourceImg = resourceCheck(skill);
          return (
            <li className="skill-description">
              <img src={resourceImg} alt="" />
              {`${skill.name} - ${skill.description}`}{" "}
            </li>
          );
        })}
      </ul>
      <h3>Card Deck</h3>
      <ul className="player-card-deck">
        {player.cardDeck.map((card) => {
          return (
            <li className="player-card" key={card.key}>
              <div className="player-card-images">
                <img src={card.image} alt="resource" />
                <div className="card-resource">
                  {card.value > 1 ? (
                    <p className="card-value">{`x${card.value}`}</p>
                  ) : (
                    <p className="card-value"></p>
                  )}
                </div>

                {card.imageTwo ? (
                  <img src={card.imageTwo} alt="image_two" />
                ) : null}
              </div>
              <div className="player-card-text">
                {card.name ? (
                  <div>
                    <h4>{card.name ? `${card.name} ` : null}</h4>
                    {card.effect ? `${card.effect}` : null}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
