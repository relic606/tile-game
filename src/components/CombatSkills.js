import React, { useEffect, useState } from "react";
import * as skillList from "./controllers/combatControllers";
import { enemies } from "./controllers/enemyControllers";

export default function CombatSkills(props) {
	const [enemyHealth, setEnemyHealth] = useState(0);
	const [defendValue, setDefendValue] = useState(1);
	const [strengthBuff, setStrengthBuff] = useState(0);
	const [weakness, setWeakness] = useState(1);
	const [randomActionNum, setRandomActionNum] = useState(
		Math.floor(Math.random() * props.enemy.actions.length)
	);
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
		// setRandomActionNum(Math.floor(Math.random() * props.enemy.actions.length));

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
	const useSkill = (skill) => {
		for (let i = 0; i < skillList.combatSkillsArray.length; i++) {
			if (
				skillList.combatSkillsArray[i].name ===
				skill.target.getAttribute("value").toLowerCase()
			) {
				if (props.statusEffect === "stun") {
					props.setCombatMessage(
						"You are stunned.  No actions can be taken this turn."
					);
					setTimeout(() => {
						props.setCombatMessage("");
					}, 1500);
				} else {
					switch (skillList.combatSkillsArray[i].actionType) {
						case "attack":
							if (
								props.combatResources.sword <
								skillList.combatSkillsArray[i].cost
							) {
								props.setCombatMessage("Not enough resources!");
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);
							} else {
								props.setCombatMessage(
									`${
										skillList.combatSkillsArray[i].message
									} The enemy has taken ${Math.floor(
										skillList.combatSkillsArray[i].value *
											(props.player.strength + strengthBuff) *
											weakness *
											props.combatResources.sword
									)} damage.`
								);
								///////////////////////////////// conditional if enemy is slain.
								if (
									enemyHealth <=
									Math.floor(
										skillList.combatSkillsArray[i].value *
											(props.player.strength + strengthBuff) *
											weakness *
											props.combatResources.sword
									)
								) {
									props.setTurn();
									if (props.bossFight === "true") {
										props.setBossFight("false");
										props.dungeonFloorIncr();
									}
									props.inCombatChange("false");
									props.setSwordResource(-props.combatResources.sword);
									props.setShieldResource(-props.combatResources.shield);
									props.setHeartResource(-props.combatResources.heart);
									props.setExperience(props.enemy.experience);
									setStrengthBuff(0);
									setWeakness(1);

									if (props.enemy.name === "Goblin") {
										props.setEnemy(enemies.normalEnemies.slime);
									} else if (props.enemy.name === "slime") {
										props.setEnemy(enemies.normalEnemies.goblin);
									}

									alert(
										`${
											skillList.combatSkillsArray[i].message
										} The enemy has taken ${Math.floor(
											skillList.combatSkillsArray[i].value *
												(props.player.strength + strengthBuff) *
												weakness *
												props.combatResources.sword
										)} damage. ${props.enemy.name} slain! You have gained ${
											props.enemy.experience
										} experience.`
									);
								}
								props.setSwordResource(
									-skillList.combatSkillsArray[i].cost *
										props.combatResources.sword
								);
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);

								setEnemyHealth(
									enemyHealth -
										Math.floor(
											skillList.combatSkillsArray[i].value *
												(props.player.strength + strengthBuff) *
												weakness *
												props.combatResources.sword
										)
								);
							}

							break;
						case "heal":
							if (
								props.combatResources.heart <
								skillList.combatSkillsArray[i].cost
							) {
								props.setCombatMessage("Not enough resources!");
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);
							} else {
								props.setCombatMessage(
									`${skillList.combatSkillsArray[i].message} ${
										skillList.combatSkillsArray[i].value *
										props.player.wisdom *
										props.combatResources.heart
									} health replenished.`
								);
								props.healthChange(
									skillList.combatSkillsArray[i].value *
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
							if (
								props.combatResources.shield <
								skillList.combatSkillsArray[i].cost
							) {
								props.setCombatMessage("Not enough resources!");
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);
							} else if (defendValue !== 1) {
								props.setCombatMessage("You reinforce your defenses.");
								setDefendValue(
									defendValue -
										skillList.combatSkillsArray[i].value *
											props.combatResources.shield
								);
								props.setShieldResource(
									-skillList.combatSkillsArray[i].cost *
										props.combatResources.shield
								);
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);
							} else {
								props.setCombatMessage(skillList.combatSkillsArray[i].message);
								setDefendValue(
									1 -
										skillList.combatSkillsArray[i].value *
											props.combatResources.shield
								);
								props.setShieldResource(
									-skillList.combatSkillsArray[i].cost *
										props.combatResources.shield
								);

								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);
							}
							break;
						case "strength buff":
							if (
								props.combatResources.heart <
								skillList.combatSkillsArray[i].cost
							) {
								props.setCombatMessage("Not enough resources!");
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);
							} else {
								props.setCombatMessage(skillList.combatSkillsArray[i].message);
								setStrengthBuff(
									strengthBuff +
										skillList.combatSkillsArray[i].value *
											props.player.wisdom *
											props.combatResources.heart
								);
								props.setHeartResource(
									-skillList.combatSkillsArray[i].cost *
										props.combatResources.heart
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
			}
		}
	};
	useEffect(() => {
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
				}, 1500);
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
					<li key={skill} value={skill} onClick={useSkill}>
						{skill}
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
			<div>{strengthBuff}</div>
		</div>
	);
}
