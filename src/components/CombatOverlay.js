import React, { useEffect, useState } from "react";
import CombatInteraction from "./combatInteraction";

export default function CombatOverlay(props) {
  const [enemyHealth, setEnemyHealth] = useState(0);

  const [turn, setTurn] = useState(1);
  const turnIncr = () => {
    setTurn((turn) => turn + 1);
  };
  const setTurnCB = () => {
    setTurn(1);
  };

  const [swordResource, setSwordResource] = useState(0);
  const [shieldResource, setShieldResource] = useState(0);
  const [heartResource, setHeartResource] = useState(0);
  const [drawResource, setDrawResource] = useState(0);

  const setNewSwordResource = (x) => {
    setSwordResource(combatResources.sword + x);
  };
  const setNewShieldResource = (x) => {
    setShieldResource(combatResources.shield + x);
  };
  const setNewHeartResource = (x) => {
    setHeartResource(combatResources.heart + x);
  };
  const setNewDrawResource = (x) => {
    setDrawResource(combatResources.draw + x);
  };

  const combatResources = {
    sword: swordResource,
    heart: heartResource,
    shield: shieldResource,
    draw: drawResource,
  };

  if (!props.inCombat) {
    return null;
  } else {
    return (
      <div className="combat">
        <div className="combat-content">
          <PlayerImage player={props.player} />

          <EnemyImage
            enemy={props.enemy}
            enemyHealth={enemyHealth}
          ></EnemyImage>
        </div>
        <CombatInteraction
          enemyHealth={enemyHealth}
          setEnemyHealth={setEnemyHealth}
          setBoss={props.setBoss}
          enemyPool={props.enemyPool}
          setEnemyPool={props.setEnemyPool}
          enemies={props.enemies}
          setExperience={props.setExperience}
          setSwordResource={setNewSwordResource}
          setShieldResource={setNewShieldResource}
          setHeartResource={setNewHeartResource}
          setDrawResource={setNewDrawResource}
          drawResource={drawResource}
          cardDeck={props.player.cardDeckTest}
          combatResources={combatResources}
          setHealthToMax={props.setHealthToMax}
          inCombat={props.inCombat}
          inCombatChange={props.inCombatChange}
          healthChange={props.healthChange}
          turn={turn}
          setTurn={setTurnCB}
          turnIncr={turnIncr}
          player={props.player}
          enemy={props.enemy}
          setEnemy={props.setEnemy}
          bossFight={props.bossFight}
          setBossFight={props.setBossFight}
          dungeonFloorIncr={props.dungeonFloorIncr}
          dungeonFloor={props.dungeonFloor}
          setEvent={props.setEvent}
          eventIsHiddenToggle={props.eventIsHiddenToggle}
        ></CombatInteraction>
      </div>
    );
  }
}
function EnemyImage(props) {
  const [enemyMaxHealth, setEnemyMaxHealth] = useState(props.enemy.maxHealth);
  return (
    <div style={{ position: "relative" }}>
      <div className="enemy-combat-div">
        <div className="enemy-health-bar">
          <div
            className="enemy-health-bar-inner"
            style={{
              width: (props.enemyHealth / enemyMaxHealth) * 200,
            }}
          >
            <div className="enemy-health-bar-numbers">
              {props.enemyHealth} / {enemyMaxHealth}
            </div>
          </div>
        </div>
        <img src={props.enemy.image} alt="enemy"></img>
      </div>
    </div>
  );
}

function PlayerImage(props) {
  return (
    <div className="player-combat-div" style={{ position: "relative" }}>
      <div className="health-bar">
        <div
          className="health-bar-inner"
          style={{
            width: (props.player.health / props.player.maxHealth) * 200,
          }}
        >
          <div className="health-bar-numbers">
            {props.player.health} / {props.player.maxHealth}
          </div>
        </div>
      </div>
      <img src={props.player.image} alt="player"></img>
    </div>
  );
}
