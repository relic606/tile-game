import React, { useEffect, useState } from "react";
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

function App() {
	const [gridWidth, setGridWidth] = useState(5);
	const [eventIsHidden, setEventIsHidden] = useState(true);
	const [playerStatsHidden, setPlayerStatsHidden] = useState(true);
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
		setPlayerStatsHidden(!playerStatsHidden);
	};

	const setNewBossFight = (boolean) => {
		setBossFight(boolean);
	};

	const [level, setLevel] = useState(1);
	const [experience, setExperience] = useState(0);
	const [expToNextLevel, setExpToNextLevel] = useState(500);
	const [health, setHealth] = useState(100);
	const [maxHealth, setMaxHealth] = useState(100);
	const [strength, setStrength] = useState(10);
	const [wisdom, setWisdom] = useState(5);
	const [skills, setSkills] = useState([
		combatSkills.slash,
		combatSkills.heal,
		combatSkills.defend,
		combatSkills.draw
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
		cardDeck: cardDeck
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
	const setNewExperience = (expGained) => {
		setExperience(() => experience + expGained);
	};
	useEffect(() => {
		if (player.experience >= player.expToNextLevel) {
			alert(`You have reached level ${player.level + 1}!`);
			setLevel(player.level + 1);
			setExperience(0);
			setExpToNextLevel(levelTables[player.level + 1].expToNextLevel);
			setMaxHealth(player.maxHealth + levelTables[player.level + 1].maxHealth);
			setHealth(player.maxHealth + levelTables[player.level + 1].maxHealth);
			setStrength(player.strength + levelTables[player.level + 1].strength);
			setWisdom(player.wisdom + levelTables[player.level + 1].wisdom);
			if (levelTables[player.level + 1].skills) {
				setSkills([...player.skills, levelTables[player.level + 1].skills]);
				alert(`New skill: ${levelTables[player.level + 1].skills.name}`);
			}
			if (levelTables[player.level + 1].card) {
				addCardToDeck(levelTables[player.level + 1].card);
				alert(`New card: ${levelTables[player.level + 1].card.text}`);
			}
		}
	}, [player.experience]);

	return (
		<div className="App">
			<button onClick={playerStatsHiddenToggle}>Player Info</button>
			<Grid
				setEnemy={setEnemy}
				enemyPool={enemyPool}
				boss={boss}
				eventIsHiddenToggle={eventIsHiddenToggle}
				eventIsHidden={eventIsHidden}
				dungeonFloor={dungeonFloor}
				gridWidth={gridWidth}
				inCombat={inCombat}
				inCombatChange={setInCombat}
				setBossFight={setNewBossFight}
			/>
			{!eventIsHidden && (
				<EventTile
					event={event}
					eventsArray={eventsArray}
					setEventsArray={setNewEventsArray}
					isHiddenToggle={eventIsHiddenToggle}
					healthChange={healthChange}
					addCardToDeck={addCardToDeck}
				/>
			)}
			{!playerStatsHidden && <PlayerStats player={player}></PlayerStats>}
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
				inCombatChange={setInCombat}
				player={player}
				bossFight={bossFight}
				setBossFight={setNewBossFight}
				dungeonFloor={dungeonFloor}
				setEnemyPool={setEnemyPool}
				enemies={enemies}
				enemyPool={enemyPool}
			></CombatOverlay>
		</div>
	);
}

export default App;
