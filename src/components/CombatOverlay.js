import React, { useEffect, useState } from "react";
import CombatSkills from "./CombatSkills";
import CardDeck from "./CardDeck";
import { enemies } from "./controllers/enemyControllers";
import heartImg from "../assets/heart.png";
import swordImg from "../assets/sword.png";
import shieldImg from "../assets/shield.png";

export default function CombatOverlay(props) {
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
		draw: drawResource
	};

	const [enemy, setEnemy] = useState({});

	const setNewEnemy = (enemy) => {
		setEnemy(enemy);
	};

	useEffect(() => {
		let enemy = {};
		if (props.bossFight === "false") {
			enemy = enemies.normalEnemies.goblin;
		} else {
			enemy = enemies.bossEnemies.ogre;
		}
		setEnemy(enemy);
	}, [props.bossFight]);

	if (props.inCombat === "false") {
		return <div className="no-combat"></div>;
	} else {
		return (
			<div className="combat">
				<div className="combat-content">
					<div className="player-combat-div"></div>
					<EnemyImage enemyImage={enemy.image}></EnemyImage>
				</div>
				<CombatInteraction
					setExperience={props.setExperience}
					setSwordResource={setNewSwordResource}
					setShieldResource={setNewShieldResource}
					setHeartResource={setNewHeartResource}
					setDrawResource={setNewDrawResource}
					drawResource={drawResource}
					cardDeck={props.player.card}
					combatResources={combatResources}
					setHealthToMax={props.setHealthToMax}
					inCombat={props.inCombat}
					inCombatChange={props.inCombatChange}
					healthChange={props.healthChange}
					turn={turn}
					setTurn={setTurnCB}
					turnIncr={turnIncr}
					player={props.player}
					enemy={enemy}
					setEnemy={setNewEnemy}
					bossFight={props.bossFight}
					setBossFight={props.setBossFight}
					dungeonFloorIncr={props.dungeonFloorIncr}
					dungeonFloor={props.dungeonFloor}
				></CombatInteraction>
			</div>
		);
	}
}
function EnemyImage(props) {
	return (
		<div style={{ position: "relative" }}>
			<div className="enemy-combat-div">
				<img src={props.enemyImage} alt="enemy"></img>
			</div>
		</div>
	);
}

function CombatInteraction(props) {
	const [combatMessage, setCombatMessage] = useState("");
	const [statusEffect, setStatusEffect] = useState("");
	const [currentHand, setCurrentHand] = useState([]);
	const [discardPile, setDiscardPile] = useState([]);
	const [drawPile, setDrawPile] = useState([...shuffle(props.player.cardDeck)]);

	const setNewCurrentHand = (newHand) => {
		setCurrentHand(newHand);
	};
	const setNewDiscardPile = (newDiscard) => {
		setDiscardPile(newDiscard);
	};
	const setNewDrawPile = (newDraw) => {
		setDrawPile(newDraw);
	};

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex]
			];
		}
		return array;
	}

	const drawXCards = (x) => {
		let newDrawPile = [...drawPile];
		const newHand = [...currentHand];
		let newDiscardPile = [...discardPile];

		// Current conditionals below only account for drawing up to 2 cards.
		// may need to adjust/add conditionals due to combinations of 1 in draw + 2 in discard, for example, not being accounted for.

		if (newDrawPile.length === 0 && newDiscardPile.length === 0) {
			////no cards left to draw
			alert("No cards remaining");
		} else if (newDrawPile.length < x && newDiscardPile.length === 0) {
			/////   not enough cards in draw pile to draw x amount, none available in discard.

			for (let i = 0; i < newDrawPile.length; i++) {
				newHand.push(newDrawPile.shift());
			}

			setCurrentHand(newHand);
			setDrawPile(newDrawPile);
		} else if (newDrawPile.length === 0 && newDiscardPile.length < x) {
			///// no cards in draw, and not enough cards in discard to draw x.

			newDrawPile = [...shuffle(newDiscardPile)];
			newDiscardPile = [];
			setDiscardPile(newDiscardPile);

			for (let i = 0; i < newDrawPile.length; i++) {
				newHand.push(newDrawPile.shift());
			}

			setCurrentHand(newHand);
			setDrawPile(newDrawPile);
		} else if (newDrawPile.length === 0 && newDiscardPile.length !== 0) {
			///// no cards in draw, but available in discard

			newDrawPile = [...shuffle(newDiscardPile)];
			newDiscardPile = [];
			setDiscardPile(newDiscardPile);

			for (let i = 0; i < x; i++) {
				newHand.push(newDrawPile.shift());
			}

			setCurrentHand(newHand);
			setDrawPile(newDrawPile);
		} else if (newDrawPile.length < x && newDiscardPile.length !== 0) {
			////not enough cards in draw pile to draw x number, but enough cards available in discard
			newHand.push(newDrawPile.shift());

			newDrawPile = [...shuffle(newDiscardPile)];

			newDiscardPile = [];
			for (let i = 0; i < x - 1; i++) {
				newHand.push(newDrawPile.shift());
			}
			setCurrentHand(newHand);
			setDrawPile(newDrawPile);
			setDiscardPile([]);
		} else if (newDrawPile.length === 0 && newDiscardPile.length !== 0) {
			////only discard pile has cards, have enough to draw x
			newDrawPile = [...shuffle(newDiscardPile)];
			newDiscardPile = [];
			for (let i = 0; i < x; i++) {
				newHand.push(newDrawPile.shift());
			}
			setCurrentHand(newHand);
			setDrawPile(newDrawPile);
			setDiscardPile([]);
		} else {
			//// draw pile has enough cards to draw x
			for (let i = 0; i < x; i++) {
				newHand.push(newDrawPile.shift());
			}

			setCurrentHand(newHand);
			setDrawPile(newDrawPile);
		}
	};

	const setCombatMessageCB = (message) => {
		setCombatMessage(() => message);
	};
	const endPlayerTurn = () => {
		props.turnIncr();
		props.setSwordResource(-props.combatResources.sword);
		props.setShieldResource(-props.combatResources.shield);
		props.setHeartResource(-props.combatResources.heart);
		props.setDrawResource(-props.combatResources.draw);
	};
	return (
		<div className="combat-interaction-container">
			{combatMessage ? (
				<div className="combat-message">{combatMessage}</div>
			) : (
				<div></div>
			)}
			<div className="combat-interaction">
				<div className="turn-resource-container">
					<div>Turn: {props.turn}</div>{" "}
					<div>Dungeon Floor: {props.dungeonFloor}</div>
					<div>
						<img src={swordImg} alt="sword" /> {props.combatResources.sword}
					</div>
					<div>
						<img src={shieldImg} alt="shield" />
						{props.combatResources.shield}
					</div>
					<div>
						<img src={heartImg} alt="sword" /> {props.combatResources.heart}
					</div>
					<div>Draw: {props.drawResource}</div>
					<button onClick={endPlayerTurn}>End Turn</button>
				</div>

				<CardDeck
					statusEffect={statusEffect}
					setCombatMessage={setCombatMessageCB}
					turn={props.turn}
					cardDeck={props.player.cardDeck}
					setSwordResource={props.setSwordResource}
					setShieldResource={props.setShieldResource}
					setHeartResource={props.setHeartResource}
					setDrawResource={props.setDrawResource}
					drawXCards={drawXCards}
					currentHand={currentHand}
					setCurrentHand={setNewCurrentHand}
					drawPile={drawPile}
					discardPile={discardPile}
					setDiscardPile={setNewDiscardPile}
					setDrawPile={setNewDrawPile}
				></CardDeck>
				<CombatSkills
					statusEffect={statusEffect}
					setStatusEffect={setStatusEffect}
					drawPileLength={drawPile.length}
					discardPileLength={discardPile.length}
					setExperience={props.setExperience}
					combatResources={props.combatResources}
					setSwordResource={props.setSwordResource}
					setShieldResource={props.setShieldResource}
					setHeartResource={props.setHeartResource}
					setDrawResource={props.setDrawResource}
					drawResource={props.drawResource}
					setHealthToMax={props.setHealthToMax}
					combatMessage={combatMessage}
					setCombatMessage={setCombatMessageCB}
					inCombat={props.inCombat}
					inCombatChange={props.inCombatChange}
					healthChange={props.healthChange}
					turn={props.turn}
					setTurn={props.setTurn}
					turnIncr={props.turnIncr}
					player={props.player}
					enemy={props.enemy}
					setEnemy={props.setEnemy}
					bossFight={props.bossFight}
					setBossFight={props.setBossFight}
					dungeonFloorIncr={props.dungeonFloorIncr}
					drawXCards={drawXCards}
				></CombatSkills>
			</div>
		</div>
	);
}
