import React, { useEffect, useState } from "react";
import { specialEvents } from "./controllers/eventControllers";

export default function CombatSkills(props) {
	const [defendValue, setDefendValue] = useState(1);
	const [strengthBuff, setStrengthBuff] = useState(0);
	const [enemyStun, setEnemyStun] = useState(false);
	const [enemyStunCoolDown, setEnemyStunCoolDown] = useState(false);
	const [randomActionNum, setRandomActionNum] = useState(
		Math.floor(Math.random() * props.enemy.actions.length)
	);

	/////////Enemy action taken after player turn ends

	function enemyAction(defendValue) {
		if (enemyStun === true && enemyStunCoolDown === false) {
			props.setCombatMessage(`The ${props.enemy.name} is stunned!`);
			setEnemyStun(false);
			setEnemyStunCoolDown(true);
		} else {
			const statusEffect = props.enemy.actions[randomActionNum].effect;
			if (statusEffect) {
				props.setStatusEffect(statusEffect);
			}
			const vulnerable = props.statusEffect.includes("Vulnerable") ? 1.5 : 1;
			const damageTaken = Math.floor(
				props.enemy.actions[randomActionNum].value * defendValue * vulnerable
			);
			if (statusEffect) {
				props.setCombatMessage(
					`${props.enemy.actions[randomActionNum].message} ${damageTaken} damage taken. ${statusEffect} status effect applied.`
				);
			} else {
				props.setCombatMessage(
					`${props.enemy.actions[randomActionNum].message} ${damageTaken} damage taken.`
				);
			}
			///////////// Attack value less than player health value

			if (props.player.health > damageTaken) {
				props.healthChange(-damageTaken);
			}
			///////////Attack greater than health, player is slain
			else {
				props.healthChange(damageTaken);
				props.setCombatMessage(
					`${props.enemy.actions[randomActionNum].message} ${damageTaken} damage taken. You have been slain!`
				);
				setTimeout(() => {
					alert("You have been slain!");
					window.location.reload();
				}, 2000);
			}
		}
	}
	/////////// Skills activate based on the value pulled from the event of the element/skill clicked

	const useSkill = (event) => {
		const skillUsed = props.player.skills.filter((skill) => {
			return skill.name === event.target.innerHTML;
		})[0];

		if (props.statusEffect.includes === "Stun") {
			props.setCombatMessage(
				"You are stunned.  No actions can be taken this turn."
			);
		} else {
			switch (skillUsed.actionType) {
				case "attack":
					if (props.combatResources.sword < skillUsed.cost) {
						props.setCombatMessage("Not enough resources!");
					} else {
						const weakness = props.statusEffect.includes("Weakness") ? 0.6 : 1;
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
							props.enemyHealth <=
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
								props.setEvent(specialEvents.cardCurse);
								props.eventIsHiddenToggle();
							}
							props.inCombatChange(false);
							props.setSwordResource(-props.combatResources.sword);
							props.setShieldResource(-props.combatResources.shield);
							props.setHeartResource(-props.combatResources.heart);
							props.setExperience(props.enemy.experience);
							setStrengthBuff(0);
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

						props.setEnemyHealth(
							props.enemyHealth -
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
					}
					break;
				case "defend":
					if (props.combatResources.shield < skillUsed.cost) {
						props.setCombatMessage("Not enough resources!");
					} else if (defendValue !== 1) {
						props.setCombatMessage(
							`You reinforce your defenses.  Blocking an additional ${
								100 * (props.combatResources.shield * 0.25)
							}% of incoming damage.`
						);

						setDefendValue(defendValue - props.combatResources.shield * 0.25);
						props.setShieldResource(
							-skillUsed.cost * props.combatResources.shield
						);
					} else {
						props.setCombatMessage(
							skillUsed.message +
								` Blocking ${
									100 * props.combatResources.shield * 0.25
								}% of incoming damage.`
						);
						setDefendValue(1 - props.combatResources.shield * 0.25);
						props.setShieldResource(
							-skillUsed.cost * props.combatResources.shield
						);
					}
					break;
				case "strength buff":
					if (props.combatResources.heart < skillUsed.cost) {
						props.setCombatMessage("Not enough resources!");
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
					}
					break;
				case "draw":
					if (props.combatResources.draw < 1) {
						props.setCombatMessage("Not enough resources!");
					} else {
						const drawAmount = props.combatResources.draw;
						props.setCombatMessage(
							`You enter a meditative state.  Draw ${drawAmount} cards.`
						);
						props.drawXCards(drawAmount);
						props.setDrawResource(-drawAmount);
					}

					break;
				case "stun":
					if (
						(props.combatResources.shield &&
							props.combatResources.shield &&
							props.combatResources.heart) < 1
					) {
						props.setCombatMessage("Not enough resources!");
					} else {
						if (enemyStunCoolDown === true) {
							props.setCombatMessage("Unable to stun the enemy.");
						} else {
							props.setCombatMessage(skillUsed.message);
							setEnemyStun(true);
							props.setSwordResource(-skillUsed.cost);
							props.setShieldResource(-skillUsed.cost);
							props.setHeartResource(-skillUsed.cost);
						}
					}

					break;
				default:
					alert("Action type not recognized");
			}
		}
	};

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * props.enemy.actions.length);
		setRandomActionNum(randomNum);
		if (props.turn === 1) {
			props.setCombatMessage(`${props.enemy.actions[randomNum].forecast}`);
		} else {
			props.setStatusEffect("");
			enemyAction(defendValue);
			setDefendValue(1);
			setStrengthBuff(0);
			setTimeout(() => {
				props.setCombatMessage(`${props.enemy.actions[randomNum].forecast}`);
			}, 2500);
		}
	}, [props.turn]);
	useEffect(() => {
		props.setEnemyHealth(props.enemy.maxHealth);
	}, [props.enemy]);
	return (
		<div className="combat-right-container">
			<ul className="skill-list">
				{props.player.skills.map((skill) => (
					<li key={skill.name} value={skill.name} onClick={useSkill}>
						{skill.name}
					</li>
				))}
			</ul>

			<div>Status Effects: {props.statusEffect}</div>
			<br></br>
			<div>Draw pile: {props.drawPileLength}</div>
			<div>Discard pile: {props.discardPileLength}</div>
		</div>
	);
}
