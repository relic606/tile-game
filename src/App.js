import React, { createRef, useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import EventTile from "./components/EventTile";
import PlayerStats from "./components/PlayerStats";
import CombatOverlay from "./components/CombatOverlay";

import { levelTables } from "./components/controllers/levelControllers";

import { events } from "./components/controllers/eventControllers";
import { enemies } from "./components/controllers/enemyControllers";
import { combatSkills } from "./components/controllers/combatControllers";
import { starterCardsArr } from "./components/controllers/cardControllers";
import playerImage from "./assets/character2.png";

function App() {
  const [gridWidth, setGridWidth] = useState(5);
  const [eventIsHidden, setEventIsHidden] = useState(true);
  const [playerStatsHidden, setPlayerStatsHidden] = useState(false);
  const [levelUpToggle, setLevelUpToggle] = useState(false);
  const [inCombat, setInCombat] = useState(false);
  const [bossFight, setBossFight] = useState(false);
  const [dungeonFloor, setDungeonFloor] = useState(1);
  const [eventsArray, setEventsArray] = useState(events);
  const [event, setEvent] = useState(
    eventsArray[Math.floor(Math.random() * eventsArray.length)]
  );

  const [enemyPool, setEnemyPool] = useState(
    enemies.normalEnemiesAll.normalEnemiesDL1
  );
  const [boss, setBoss] = useState(enemies.bossEnemiesAll.bossEnemiesDL1[0]);

  const [enemy, setEnemy] = useState({});

  let combatMusic = new Audio("/combat.mp4");
  let worldMusic = new Audio("/world.mp4");

  const [combatAudio, setCombatAudio] = useState(combatMusic);
  const [worldAudio, setWorldAudio] = useState(worldMusic);

  const setInCombatCB = (bool) => {
    if (inCombat === false) {
      worldAudio.pause();
      worldAudio.load();
      combatAudio.play();
    } else {
      combatAudio.pause();
      combatAudio.load();
      worldAudio.play();
    }
    setInCombat(bool);
  };

  const setNewEnemy = (enemy) => {
    setEnemy(enemy);
  };

  //////////  Grows grid size with each floor passed, resetting to 5x5 after 3

  const dungeonFloorIncr = () => {
    if (dungeonFloor % 3 !== 0) {
      setGridWidth(gridWidth + 1);
      setDungeonFloor(dungeonFloor + 1);
    } else {
      setGridWidth(5);
      setDungeonFloor(dungeonFloor + 1);
    }
  };

  const setNewEventsArray = (arr) => {
    setEventsArray(arr);
  };

  const eventIsHiddenToggle = () => {
    setEventIsHidden(!eventIsHidden);
    if (!eventIsHidden) {
      setEvent(eventsArray[0]);
    }
  };

  const playerStatsHiddenToggle = () => {
    if (!playerStatsHidden && !inCombat) {
      worldAudio.play();
    }
    setPlayerStatsHidden(!playerStatsHidden);
  };

  const setNewBossFight = (boolean) => {
    setBossFight(boolean);
  };

  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [expToNextLevel, setExpToNextLevel] = useState(500);
  const [health, setHealth] = useState(80);
  const [maxHealth, setMaxHealth] = useState(80);
  const [strength, setStrength] = useState(10);
  const [wisdom, setWisdom] = useState(8);
  const [skills, setSkills] = useState([
    combatSkills.slash,
    combatSkills.heal,
    combatSkills.defend,
    combatSkills.draw,
    combatSkills.weakeningFlurry,
  ]);

  const [cardDeck, setCardDeck] = useState(starterCardsArr);

  const addCardToDeck = (card) => {
    const newCardDeck = [...cardDeck];
    newCardDeck.push(card);
    setCardDeck(newCardDeck);
  };

  const player = {
    level: level,
    experience: experience,
    expToNextLevel: expToNextLevel,
    health: health,
    maxHealth: maxHealth,
    strength: strength,
    wisdom: wisdom,
    skills: skills,
    cardDeck: cardDeck,
    image: playerImage,
  };

  const healthChange = (amount) => {
    if (player.health + amount >= player.maxHealth) {
      setHealth(() => player.maxHealth);
    } else {
      setHealth(() => health + amount);
    }
  };
  const setHealthToMax = () => {
    setHealth(() => maxHealth);
  };

  const changeStrength = (amount) => {
    setStrength(player.strength + amount);
  };

  const changeWisdom = (amount) => {
    setWisdom(player.wisdom + amount);
  };

  const setNewExperience = (expGained) => {
    setExperience(() => experience + expGained);
  };

  const levelUp = () => {
    setLevelUpToggle(false);
    alert(`You have reached level ${player.level + 1}!`);
    setLevel(player.level + 1);
    setExperience(0);
    setExpToNextLevel(levelTables[player.level + 1].expToNextLevel);
    setMaxHealth(player.maxHealth + levelTables[player.level + 1].maxHealth);
    setStrength(player.strength + levelTables[player.level + 1].strength);
    setWisdom(player.wisdom + levelTables[player.level + 1].wisdom);
    if (levelTables[player.level + 1].skills) {
      setSkills([...player.skills, levelTables[player.level + 1].skills]);
      alert(`New skill: ${levelTables[player.level + 1].skills.name}`);
    }
    if (levelTables[player.level + 1].card) {
      addCardToDeck(levelTables[player.level + 1].card);
      alert(`New card: ${levelTables[player.level + 1].card.name}`);
    }
  };

  useEffect(() => {
    if (player.experience >= player.expToNextLevel) {
      setLevelUpToggle(true);
    }
  }, [player.experience]);

  return (
    <div className="App">
      <button onClick={playerStatsHiddenToggle} id="game-info-btn">
        Game Info
      </button>
      {levelUpToggle && (
        <button onClick={levelUp} id="level-up-btn">
          Level up!
        </button>
      )}
      <Grid
        setEvent={setEvent}
        playerStatsHidden={playerStatsHidden}
        setEnemy={setEnemy}
        enemyPool={enemyPool}
        boss={boss}
        eventIsHiddenToggle={eventIsHiddenToggle}
        eventIsHidden={eventIsHidden}
        dungeonFloor={dungeonFloor}
        gridWidth={gridWidth}
        inCombat={inCombat}
        inCombatChange={setInCombatCB}
        setBossFight={setNewBossFight}
      />
      {!eventIsHidden && (
        <EventTile
          changeStrength={changeStrength}
          changeWisdom={changeWisdom}
          setWisdom={setWisdom}
          event={event}
          eventsArray={eventsArray}
          setEventsArray={setNewEventsArray}
          isHiddenToggle={eventIsHiddenToggle}
          healthChange={healthChange}
          addCardToDeck={addCardToDeck}
        />
      )}
      {!playerStatsHidden && (
        <PlayerStats player={player} dungeonFloor={dungeonFloor}></PlayerStats>
      )}
      <CombatOverlay
        setBoss={setBoss}
        enemy={enemy}
        setEnemy={setNewEnemy}
        dungeonFloorIncr={dungeonFloorIncr}
        setExperience={setNewExperience}
        cardDeck={player.cardDeck}
        setCardDeck={setCardDeck}
        setHealthToMax={setHealthToMax}
        healthChange={healthChange}
        inCombat={inCombat}
        inCombatChange={setInCombatCB}
        player={player}
        bossFight={bossFight}
        setBossFight={setNewBossFight}
        dungeonFloor={dungeonFloor}
        setEnemyPool={setEnemyPool}
        enemies={enemies}
        enemyPool={enemyPool}
        setEvent={setEvent}
        eventIsHiddenToggle={eventIsHiddenToggle}
      ></CombatOverlay>
    </div>
  );
}

export default App;
