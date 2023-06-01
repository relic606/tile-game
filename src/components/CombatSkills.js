import React, { useEffect, useState } from "react";
import * as skillList from "./controllers/combatControllers";

export default function CombatSkills(props) {
	const [enemyHealth, setEnemyHealth] = useState(0);
	const [defendValue, setDefendValue] = useState(1);
	const [strengthBuff, setStrengthBuff] = useState(0);
	const [weakness, setWeakness] = useState(1);
	const [randomActionNum, setRandomActionNum] = useState(
		Math.floor(Math.random() * props.enemy.actions.length)
	);
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseOver = () => {
		setIsHovering(true);
	};
	const handleMouseOut = () => {
		setIsHovering(false);
	};

	/////////Enemy action taken after player turn ends

	function enemyAction(defendValue) {
		if (props.enemy.actions[randomActionNum].effect) {
			props.setStatusEffect(props.enemy.actions[randomActionNum].effect);
		}
		props.setCombatMessage(
			`${props.enemy.actions[randomActionNum].message} ${Math.floor(
				props.enemy.actions[randomActionNum].value * defendValue
			)} damage taken.`
		);
		if (props.enemy.actions[randomActionNum].effect === "weakness") {
			setWeakness(0.5);
		}

		///////////// Attack value less than player health value

		if (props.player.health > props.enemy.actions[randomActionNum].value) {
			setTimeout(() => {
				props.healthChange(
					Math.floor(-props.enemy.actions[randomActionNum].value * defendValue)
				);
			}, 1500);
		}
		///////////Attack greater than health, player is slain
		else {
			props.healthChange(-props.enemy.actions[randomActionNum].value);
			props.setCombatMessage(
				`${props.enemy.actions[randomActionNum].message} ${
					props.enemy.actions[randomActionNum].value * defendValue
				} damage taken. You have been slain!`
			);
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		}

		setTimeout(() => {
			props.setCombatMessage("");
		}, 1500);
	}
	/////////// Skills activate based on the value pulled from the event of the element/skill clicked

	const useSkill = (event) => {
		const skillUsed = props.player.skills.filter((skill) => {
			return skill.name === event.target.innerHTML;
		})[0];

		if (props.statusEffect === "stun") {
			props.setCombatMessage(
				"You are stunned.  No actions can be taken this turn."
			);
			setTimeout(() => {
				props.setCombatMessage("");
			}, 1500);
		} else {
			switch (skillUsed.actionType) {
				case "attack":
					if (props.combatResources.sword < skillUsed.cost) {
						props.setCombatMessage("Not enough resources!");
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					} else {
						props.setCombatMessage(
							`${skillUsed.message} The enemy has taken ${Math.floor(
								skillUsed.value *
									(props.player.strength + strengthBuff) *
									weakness *
									props.combatResources.sword
							)} damage.`
						);
						///////////////////////////////// conditional if enemy is slain.
						if (
							enemyHealth <=
							Math.floor(
								skillUsed.value *
									(props.player.strength + strengthBuff) *
									weakness *
									props.combatResources.sword
							)
						) {
							props.setTurn();
							if (props.bossFight === true) {
								props.dungeonFloorIncr();
								props.setEnemyPool(
									props.enemies.normalEnemiesAll.normalEnemiesDL2
								);
								props.setBoss(props.enemies.bossEnemiesAll.bossEnemiesDL2[0]);
								props.setBossFight(false);
							}
							props.inCombatChange(false);
							props.setSwordResource(-props.combatResources.sword);
							props.setShieldResource(-props.combatResources.shield);
							props.setHeartResource(-props.combatResources.heart);
							props.setExperience(props.enemy.experience);
							setStrengthBuff(0);
							setWeakness(1);
							alert(
								`${skillUsed.message} The enemy has taken ${Math.floor(
									skillUsed.value *
										(props.player.strength + strengthBuff) *
										weakness *
										props.combatResources.sword
								)} damage. ${props.enemy.name} slain! You have gained ${
									props.enemy.experience
								} experience.`
							);
						}
						props.setSwordResource(
							-skillUsed.cost * props.combatResources.sword
						);
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
						setEnemyHealth(
							enemyHealth -
								Math.floor(
									skillUsed.value *
										(props.player.strength + strengthBuff) *
										weakness *
										props.combatResources.sword
								)
						);
					}
					break;
				case "heal":
					if (props.combatResources.heart < skillUsed.cost) {
						props.setCombatMessage("Not enough resources!");
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					} else {
						props.setCombatMessage(
							`${skillUsed.message} ${
								skillUsed.value *
								props.player.wisdom *
								props.combatResources.heart
							} health replenished.`
						);
						props.healthChange(
							skillUsed.value *
								props.player.wisdom *
								props.combatResources.heart
						);
						props.setHeartResource(-props.combatResources.heart);
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					}
					break;
				case "defend":
					if (props.combatResources.shield < skillUsed.cost) {
						props.setCombatMessage("Not enough resources!");
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					} else if (defendValue !== 1) {
						props.setCombatMessage("You reinforce your defenses.");
						setDefendValue(
							defendValue - skillUsed.value * props.combatResources.shield
						);
						props.setShieldResource(
							-skillUsed.cost * props.combatResources.shield
						);
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					} else {
						props.setCombatMessage(skillUsed.message);
						setDefendValue(1 - skillUsed.value * props.combatResources.shield);
						props.setShieldResource(
							-skillUsed.cost * props.combatResources.shield
						);
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					}
					break;
				case "strength buff":
					if (props.combatResources.heart < skillUsed.cost) {
						props.setCombatMessage("Not enough resources!");
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					} else {
						props.setCombatMessage(skillUsed.message);
						setStrengthBuff(
							strengthBuff +
								skillUsed.value *
									props.player.wisdom *
									props.combatResources.heart
						);
						props.setHeartResource(
							-skillUsed.cost * props.combatResources.heart
						);
						setTimeout(() => {
							props.setCombatMessage("");
						}, 1500);
					}
					break;
				case "draw":
					if (props.drawResource < 1) {
						props.setCombatMessage("Not enough resources!");
					} else {
						const drawAmount = props.drawResource;
						props.setCombatMessage(
							`You enter a meditative state.  Draw ${drawAmount} cards.`
						);
						props.drawXCards(drawAmount);
						props.setDrawResource(-drawAmount);
					}
					setTimeout(() => {
						props.setCombatMessage("");
					}, 1500);
					break;
				default:
					console.log("Action type not recognized");
			}
		}
	};

	useEffect(() => {
		console.log(props.player.skills);
		const randomNum = Math.floor(Math.random() * props.enemy.actions.length);
		setRandomActionNum(randomNum);
		if (props.turn === 1) {
			props.setCombatMessage(`${props.enemy.actions[randomNum].forecast}`);

			setTimeout(() => {
				props.setCombatMessage("");
			}, 2500);
		} else {
			props.setStatusEffect("");
			setWeakness(1);
			enemyAction(defendValue);
			setDefendValue(1);
			setStrengthBuff(0);
			setTimeout(() => {
				props.setCombatMessage(`${props.enemy.actions[randomNum].forecast}`);
				setTimeout(() => {
					props.setCombatMessage("");
				}, 2500);
			}, 1500);
		}
	}, [props.turn]);
	useEffect(() => {
		setEnemyHealth(props.enemy.maxHealth);
	}, [props.enemy]);
	return (
		<div>
			<ul className="skill-list">
				{props.player.skills.map((skill) => (
					<li
						key={skill.name}
						value={skill.name}
						onClick={useSkill}
						onMouseOver={handleMouseOver}
						// onMouseOut={handleMouseOut}
					>
						{skill.name}
						{/* {isHovering && (
							<div className="skill-hovering">
								<p>{skill.description}</p>
							</div>
						)} */}
					</li>
				))}
			</ul>
			<div>
				Player Health: {props.player.health > 0 ? props.player.health : 0} /{" "}
				{props.player.maxHealth}
			</div>
			<div>
				{props.enemy.name} Health: {enemyHealth > 0 ? enemyHealth : 0}
			</div>
			<div>Status Effects: {props.statusEffect}</div>
			<br></br>
			<div>Draw pile: {props.drawPileLength}</div>
			<div>Discard pile: {props.discardPileLength}</div>
		</div>
	);
}
