import React, { useEffect, useState } from "react";

export default function CardDeck(props) {
	const handleNewHand = () => {
		const newHand = [...props.currentHand];
		const newDrawPile = [...props.drawPile];
		for (let i = 0; i < 4; i++) {
			newHand.push(newDrawPile.shift());
		}
		props.setCurrentHand(newHand);
		props.setDrawPile(newDrawPile);
	};

	const discardCard = (e) => {
		const idOfRmvCard = Number(e.target.children[1].innerHTML);

		for (let i = 0; i < props.currentHand.length; i++) {
			if (props.currentHand[i][1] === idOfRmvCard) {
				const newHand = [...props.currentHand];
				const cardRemoved = newHand.splice(i, 1);
				const newDiscardPile = [...props.discardPile];
				newDiscardPile.push([cardRemoved[0][0], cardRemoved[0][1]]);
				props.setDiscardPile(newDiscardPile);
				props.setCurrentHand(newHand);
			}
		}
	};
	const exhaustCard = (e) => {
		const idOfRmvCard = Number(e.target.children[1].innerHTML);
		for (let i = 0; i < props.currentHand.length; i++) {
			if (props.currentHand[i][1] === idOfRmvCard) {
				const newHand = [...props.currentHand];
				newHand.splice(i, 1);
				props.setCurrentHand(newHand);
			}
		}
	};

	const handleCardClick = (event) => {
		if (
			props.statusEffect === "stun" &&
			event.target.children[0].innerHTML !== "Cleanse"
		) {
			props.setCombatMessage("You cannot play a card while stunned");
			setTimeout(() => {
				props.setCombatMessage("");
			}, 1500);
		} else {
			switch (event.target.children[0].innerHTML) {
				case "Sword":
					props.setSwordResource(1);
					discardCard(event);
					break;
				case "Shield":
					props.setShieldResource(1);
					discardCard(event);
					break;
				case "Heart":
					props.setHeartResource(1);
					discardCard(event);
					break;
				case "Draw":
					props.setDrawResource(2);
					if (event.target.children[2].innerHTML === "Exhaust") {
						exhaustCard(event);
					} else {
						discardCard(event);
					}

					break;
				case "Curse":
					exhaustCard(event);
					break;
				case "Cleanse":
					props.setCombatMessage("You have been cleansed of your ailments.");
					props.setStatusEffect("");
					exhaustCard(event);
					setTimeout(() => {
						props.setCombatMessage("");
					}, 1500);
					break;
				default:
					alert("card not recognized");
			}
		}
	};

	function textUnclickable(e) {
		e.stopPropagation();
	}

	useEffect(() => {
		if (props.turn === 1) {
			handleNewHand();
		} else {
			props.drawXCards(2);
		}
	}, [props.turn]);

	return (
		<div>
			<div className="card-deck-container">
				{props.currentHand.map((card) => (
					<div className="card" onClick={handleCardClick}>
						<h3 className="card-title" onClick={textUnclickable}>
							{card[0]}
						</h3>
						<p>{card[1]}</p>
						<div onClick={textUnclickable}> {card[2]}</div>
					</div>
				))}
			</div>
		</div>
	);
}
