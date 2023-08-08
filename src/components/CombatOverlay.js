import React, { useEffect, useState } from "react";
import CombatInteraction from "./combatInteraction";
import slashImg from "../assets/slash.png";
import vulnerableImg from "../assets/icon-vulnerable.png";
import weaknessImg from "../assets/icon-weakness.png";
import stunImg from "../assets/stun-icon.png";

export default function CombatOverlay(props) {
  const [enemyHealth, setEnemyHealth] = useState(0);

  const [turn, setTurn] = useState(1);
  const turnIncr = () => {
    setTurn((turn) => turn + 1);
  };
  const setTurnCB = () => {
    setTurn(1);
  };

  const [statusEffect, setStatusEffect] = useState("");
  const [enemyStatusEffect, setEnemyStatusEffect] = useState("");

  function addStatusEffect(status) {
    if (statusEffect === "") {
      setStatusEffect(status);
    } else if (statusEffect.includes(`${status}`)) {
    } else {
      setStatusEffect(`${statusEffect}  ${status}`);
    }
  }

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

  const animateSlash = () => {
    let img = document.createElement("img");
    const animationContainer = document.getElementById(
      "combat-animation-container"
    );
    img.src = slashImg;
    img.id = "combat-animation";
    animationContainer.appendChild(img);
    setTimeout(() => {
      img.remove();
    }, 500);
  };

  if (!props.inCombat) {
    return null;
  } else {
    return (
      <div className="combat">
        <div className="combat-content">
          <PlayerImage
            player={props.player}
            turn={turn}
            statusEffect={statusEffect}
            enemyStatusEffect={enemyStatusEffect}
          />
          <EnemyImage
            enemyStatusEffect={enemyStatusEffect}
            setEnemyStatusEffect={setEnemyStatusEffect}
            enemy={props.enemy}
            enemyHealth={enemyHealth}
          ></EnemyImage>
        </div>
        <CombatInteraction
          enemyStatusEffect={enemyStatusEffect}
          setEnemyStatusEffect={setEnemyStatusEffect}
          addStatusEffect={addStatusEffect}
          statusEffect={statusEffect}
          setStatusEffect={setStatusEffect}
          animateSlash={animateSlash}
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
        <div id="combat-animation-container"></div>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {props.enemyStatusEffect ? (
            <div className="enemy-status-banner">{props.enemyStatusEffect}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PlayerImage(props) {
  const [shake, setShake] = useState(false);
  const [statusImg, setStatusImg] = useState("");

  useEffect(() => {
    if (props.turn !== 1) {
      const animate = () => {
        setShake(true);
        setTimeout(() => setShake(false), 700);
      };
      animate();
    }
  }, [props.turn]);

  useEffect(() => {
    let newImage = "";
    switch (props.statusEffect) {
      case "Vulnerable":
        newImage = vulnerableImg;
        break;
      case "Weakness":
        newImage = weaknessImg;
        break;
      case "Slow":
        newImage = "";
        break;
      default:
        newImage = "";
        break;
    }
    setStatusImg(newImage);
  }, [props.statusEffect]);

  return (
    <div className="player-combat-div" style={{ position: "relative" }}>
      {props.statusEffect === "Stun" ? (
        <img src={stunImg} style={{ position: "absolute", zIndex: 1 }}></img>
      ) : null}
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          src={props.player.image}
          alt="player"
          className={
            shake && props.enemyStatusEffect !== "Stun" ? "shake" : null
          }
        ></img>
      </div>
      {props.statusEffect && props.statusEffect !== "Stun" ? (
        <img
          src={statusImg}
          className="player-status-image"
          alt="Player status image"
        ></img>
      ) : null}
    </div>
  );
}
