import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import EventTile from "./components/EventTile";
import CombatOverlay from "./components/CombatOverlay";
import { levelTables } from "./components/controllers/levelControllers";

import { events } from "./components/controllers/eventControllers";

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
	const eventIsHiddenToggle = () => {
		setEventIsHidden(!eventIsHidden);
		if (!eventIsHidden) {
			setEvent(eventsArray[Math.floor(Math.random() * eventsArray.length)]);
		}
	};

	const inCombatChange = (combatStatus) => {
		setInCombat(combatStatus);
	};
	const setNewBossFight = (fightingBoss) => {
		setBossFight(fightingBoss);
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

	const [cardDeck, setCardDeck] = useState([
		["Sword", 1, null],
		["Sword", 2, null],
		["Sword", 3, null],
		// ["Shield", 4, null],
		["Shield", 5, null],
		["Shield", 6, null],
		["Heart", 7, null],
		["Heart", 8, null]
		// ["Heart", 9, null]
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
			setLevel(levelTables[player.level + 1]);
			setExperience(0);
			setExpToNextLevel(levelTables[player.level + 1].expToNextLevel);
			setMaxHealth(player.maxHealth + levelTables[player.level + 1].maxHealth);
			setHealth(player.maxHealth + levelTables[player.level + 1].maxHealth);
			setStrength(player.strength + levelTables[player.level + 1].strength);
			setWisdom(player.wisdom + levelTables[player.level + 1].wisdom);
			if (levelTables[player.level + 1].skills) {
				setSkills([...player.skills, levelTables[player.level + 1].skills]);
			}
		}
	}, [player.experience]);

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
					isHiddenToggle={eventIsHiddenToggle}
					healthChange={healthChange}
					addCardToDeck={addCardToDeck}
				/>
			)}
			<CombatOverlay
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
