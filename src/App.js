import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import EventTile from "./components/EventTile";
import CombatOverlay from "./components/CombatOverlay";
import { levelTables } from "./components/controllers/levelControllers";

import { events } from "./components/controllers/eventControllers";
import { enemies } from "./components/controllers/enemyControllers";

function App() {
	const [gridWidth, setGridWidth] = useState(5);
	const [eventIsHidden, setEventIsHidden] = useState(true);
	const [inCombat, setInCombat] = useState("false");
	const [bossFight, setBossFight] = useState("false");
	const [dungeonFloor, setDungeonFloor] = useState(1);
	const [eventsArray, setEventsArray] = useState(events);
	const [event, setEvent] = useState(
		eventsArray[Math.floor(Math.random() * eventsArray.length)]
	);
	const [enemy, setEnemy] = useState(enemies.normalEnemies.goblin);

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

	const inCombatChange = (combatStatus) => {
		setInCombat(combatStatus);
	};
	const setNewBossFight = (fightingBoss) => {
		setBossFight(fightingBoss);
		setEnemy(enemies.bossEnemies.ogre);
	};

	const [level, setLevel] = useState(1);
	const [experience, setExperience] = useState(0);
	const [expToNextLevel, setExpToNextLevel] = useState(1000);
	const [health, setHealth] = useState(100);
	const [maxHealth, setMaxHealth] = useState(100);
	const [strength, setStrength] = useState(10);
	const [wisdom, setWisdom] = useState(5);
	const [skills, setSkills] = useState(["Slash", "Heal", "Defend", "Draw"]);

	////// second of card element is the key, third element is special effect text (ie "Exhaust")

	// const [cardDeck, setCardDeck] = useState([
	// 	["Sword", 1, null],
	// 	["Sword", 2, null],
	// 	["Sword", 3, null],
	// 	["Shield", 4, null],
	// 	["Shield", 5, null],
	// 	["Shield", 6, null],
	// 	["Heart", 7, null],
	// 	["Heart", 8, null],
	// 	["Heart", 9, null]
	// ]);

	const [cardDeck, setCardDeck] = useState([
		{
			text: "Sword",
			effect: null,
			key: 1
		},
		{
			text: "Sword",
			effect: null,
			key: 2
		},
		{
			text: "Sword",
			effect: null,
			key: 3
		},
		{
			text: "Shield",
			effect: null,
			key: 4
		},
		{
			text: "Shield",
			effect: null,
			key: 5
		},
		{
			text: "Shield",
			effect: null,
			key: 6
		},
		{
			text: "Heart",
			effect: null,
			key: 7
		},
		{
			text: "Heart",
			effect: null,
			key: 8
		},
		{
			text: "Heart",
			effect: null,
			key: 9
		}
	]);

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
				alert(`New skill: ${levelTables[player.level + 1].skills}`);
			}
			if (levelTables[player.level + 1].card) {
				addCardToDeck(levelTables[player.level + 1].card);
				alert(`New card: ${levelTables[player.level + 1].card.text}`);
			}
		}
	}, [player.experience]);

	useEffect(() => {
		let enemy = {};
		if (bossFight === "false") {
			enemy = enemies.normalEnemies.goblin;
		} else {
			enemy = enemies.bossEnemies.ogre;
		}
		setEnemy(enemy);
	}, [bossFight]);

	return (
		<div className="App">
			<Grid
				eventIsHiddenToggle={eventIsHiddenToggle}
				eventIsHidden={eventIsHidden}
				dungeonFloor={dungeonFloor}
				gridWidth={gridWidth}
				inCombat={inCombat}
				inCombatChange={inCombatChange}
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
			<CombatOverlay
				enemy={enemy}
				setEnemy={setNewEnemy}
				dungeonFloorIncr={dungeonFloorIncr}
				setExperience={setNewExperience}
				cardDeck={player.cardDeck}
				setCardDeck={setCardDeck}
				setHealthToMax={setHealthToMax}
				healthChange={healthChange}
				inCombat={`${inCombat}`}
				inCombatChange={inCombatChange}
				player={player}
				bossFight={bossFight}
				setBossFight={setNewBossFight}
				dungeonFloor={dungeonFloor}
			></CombatOverlay>
		</div>
	);
}

export default App;
