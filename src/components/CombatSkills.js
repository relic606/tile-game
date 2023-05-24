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
		// const randomNum = Math.floor(Math.random() * props.enemy.actions.length);

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
		setRandomActionNum(Math.floor(Math.random() * props.enemy.actions.length));
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
											weakness
									)} damage.`
								);
								///////////////////////////////// conditional if enemy is slain.
								if (
									enemyHealth <=
									Math.floor(
										skillList.combatSkillsArray[i].value *
											(props.player.strength + strengthBuff) *
											weakness
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
												weakness
										)} damage. ${props.enemy.name} slain! You have gained ${
											props.enemy.experience
										} experience.`
									);
								}
								props.setSwordResource(-skillList.combatSkillsArray[i].cost);
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);

								setEnemyHealth(
									enemyHealth -
										Math.floor(
											skillList.combatSkillsArray[i].value *
												(props.player.strength + strengthBuff) *
												weakness
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
										skillList.combatSkillsArray[i].value * props.player.wisdom
									} health replenished.`
								);
								props.healthChange(
									skillList.combatSkillsArray[i].value * props.player.wisdom
								);
								props.setHeartResource(-1);

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
								props.setCombatMessage("You have already defended this turn.");
								setTimeout(() => {
									props.setCombatMessage("");
								}, 1500);
							} else {
								props.setCombatMessage(skillList.combatSkillsArray[i].message);
								setDefendValue(skillList.combatSkillsArray[i].value);
								props.setShieldResource(-skillList.combatSkillsArray[i].cost);

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
									skillList.combatSkillsArray[i].value * props.player.wisdom
								);
								props.setHeartResource(-skillList.combatSkillsArray[i].cost);

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
		console.log();
		if (props.turn === 1) {
			console.log(props.enemy);
			props.setCombatMessage(
				`${props.enemy.actions[randomActionNum].forecast}`
			);
			setTimeout(() => {
				props.setCombatMessage("");
			}, 1500);
		} else {
			props.setStatusEffect("");
			setWeakness(1);
			enemyAction(defendValue);
			setDefendValue(1);
			setTimeout(() => {
				props.setCombatMessage(
					`${props.enemy.actions[randomActionNum].forecast}`
				);
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
		</div>
	);
}
