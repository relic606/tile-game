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
		const selectedCardKey = Number(e.target.getAttribute("cardKey"));

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
		const selectedCardKey = Number(e.target.getAttribute("cardKey"));
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
			const cardUsed = props.currentHand.filter((card) => {
				return card.key === Number(event.target.getAttribute("cardKey"));
			})[0];

			if (cardUsed.effect === "Exhaust") {
				exhaustCard(event);
			} else {
				discardCard(event);
			}

			const cardTypeArr = cardUsed.type.split(" ");

			while (cardTypeArr.length > 0) {
				switch (cardTypeArr[0]) {
					case "Sword":
						props.setSwordResource(cardUsed.value);
						cardTypeArr.shift();
						break;
					case "Shield":
						props.setShieldResource(cardUsed.value);
						cardTypeArr.shift();
						break;
					case "Heart":
						props.setHeartResource(cardUsed.value);
						cardTypeArr.shift();
						break;
					case "Draw":
						props.setDrawResource(cardUsed.value);
						cardTypeArr.shift();

						break;
					case "Curse":
						cardTypeArr.shift();
						props.setCombatMessage(
							"Your energy has been sapped by a mysterious force."
						);
						props.setStatusEffect("");
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
						break;
					case "Cleanse":
						cardTypeArr.shift();
						props.setCombatMessage("You have been cleansed of your ailments.");
						props.setStatusEffect("");
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
						break;
					default:
						alert("card not recognized");
				}
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
					<div
						className="card"
						onClick={handleCardClick}
						key={card.key}
						cardkey={card.key}
						effect={card.effect}
					>
						{card.name ? (
							<p className="card-title" onClick={textUnclickable}>
								{card.name}
							</p>
						) : null}

						<div className="card-image" onClick={textUnclickable}>
							<img src={card.image} alt="card_img" className="card-image" />
							{card.imageTwo ? (
								<img
									src={card.imageTwo}
									alt="card_img"
									className="card-image"
								/>
							) : (
								<div />
							)}
						</div>
						{card.effect ? (
							<div onClick={textUnclickable} className="card-effect">
								{card.effect}
							</div>
						) : (
							<div onClick={textUnclickable}> </div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
