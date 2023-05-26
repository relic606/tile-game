import React, { useEffect } from "react";

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
		const selectedCardKey = Number(e.target.children[1].innerHTML);
		const checkCardID = props.currentHand.filter(
			(card) => selectedCardKey === card.key
		);
		const keyOfRmvCard = checkCardID[0].key;

		const newCurrentHand = props.currentHand.filter(
			(card) => card.key !== keyOfRmvCard
		);

		props.setCurrentHand(newCurrentHand);

		const cardRemoved = props.cardDeck.filter(
			(card) => card.key === keyOfRmvCard
		);

		props.setDiscardPile([...props.discardPile, cardRemoved[0]]);
	};
	const exhaustCard = (e) => {
		const selectedCardKey = Number(e.target.children[1].innerHTML);
		const checkCardKey = props.currentHand.filter(
			(card) => selectedCardKey === card.key
		);
		const keyOfRmvCard = checkCardKey[0].key;

		const newCurrentHand = props.currentHand.filter(
			(card) => card.key !== keyOfRmvCard
		);

		props.setCurrentHand(newCurrentHand);
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
			const cardText = event.target.children[0].innerHTML;

			switch (cardText) {
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
					exhaustCard(event);

					break;
				case "Curse":
					exhaustCard(event);
					break;
				case "Cleanse":
					props.setCombatMessage("You have been cleansed of your ailments.");
					exhaustCard(event);
					props.setStatusEffect("");
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
					<div className="card" onClick={handleCardClick} key={card.key}>
						<h3 className="card-title" onClick={textUnclickable}>
							{card.text}
						</h3>
						<p>{card.key}</p>
						<div onClick={textUnclickable}> {card.effect}</div>
					</div>
				))}
			</div>
		</div>
	);
}
