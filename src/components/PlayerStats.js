import React from "react";
import swordImg from "../assets/sword.png";
import shieldImg from "../assets/shield.png";
import heartImg from "../assets/heart.png";
import drawImg from "../assets/cards1.png";

export default function PlayerStats(props) {
	const resourceCheck = (skill) => {
		switch (skill.actionType) {
			case "attack":
				return swordImg;
				break;
			case "defend":
				return shieldImg;
				break;
			case "heal":
				return heartImg;
				break;
			case "strength buff":
				return heartImg;
				break;
			case "draw":
				return drawImg;
				break;
			default:
		}
	};
	const { player } = props;
	return (
		<div className="player-stats-container">
			<div className="player-stat-numbers">
				<h3>Level: {player.level}</h3>
				<p>
					Experience: {player.experience} / {player.expToNextLevel}
				</p>
				<p>Strength: {player.strength}</p>
				<p>Wisdom: {player.wisdom}</p>
				<p>
					Health: {player.health} / {player.maxHealth}
				</p>
				<h3>Combat Skills</h3>
				<ul className="player-skill-list">
					{player.skills.map((skill) => {
						const resourceImg = resourceCheck(skill);
						return (
							<li className="skill-description">
								<img src={resourceImg} alt="" />
								{`${skill.name} - ${skill.description}`}{" "}
							</li>
						);
					})}
				</ul>
				<h3>Card Deck</h3>
				<ul className="player-card-deck">
					{player.cardDeck.map((card) => {
						return (
							<li className="player-card" key={card.key}>
								<div className="card-images">
									<img src={card.image} alt="resource" />

									{card.value > 1 ? (
										<p className="card-value">{`x${card.value}`}</p>
									) : null}
									{card.imageTwo ? (
										<img src={card.imageTwo} alt="image_two" />
									) : null}
								</div>
								<div className="player-card-text">
									{card.name ? (
										<div>
											<h4>{card.name ? `${card.name} ` : null}</h4>
											{card.effect ? `${card.effect}` : null}
										</div>
									) : null}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
