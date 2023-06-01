import React from "react";

export default function PlayerStats(props) {
	const { player } = props;
	return (
		<div className="player-stats-container">
			<div className="player-stat-numbers">
				<p>Level: {player.level}</p>
				<p>
					Experience: {player.experience} / {player.expToNextLevel}
				</p>
				<br />
				<p>Strength: {player.strength}</p>
				<p>Wisdom: {player.wisdom}</p>
				<p>
					Health: {player.health} / {player.maxHealth}
				</p>
				Combat Skills
				<ul>
					{player.skills.map((skill) => {
						return (
							<li>
								{skill.name} - {skill.description}{" "}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

// const player = {
//     level: level,
//     experience: experience,
//     expToNextLevel: expToNextLevel,
//     health: health,
//     maxHealth: maxHealth,
//     strength: strength,
//     wisdom: wisdom,
//     skills: skills,
//     cardDeck: cardDeck
// };
