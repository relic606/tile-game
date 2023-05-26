import React, { useState } from "react";

import CombatSkills from "./CombatSkills";
import CardDeck from "./CardDeck";
import heartImg from "../assets/heart.png";
import swordImg from "../assets/sword.png";
import shieldImg from "../assets/shield.png";

export default function CombatInteraction(props) {
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
					setStatusEffect={setStatusEffect}
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
