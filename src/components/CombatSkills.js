import React, { useEffect, useState } from "react";

export default function CombatSkills(props) {
  const [defendValue, setDefendValue] = useState(1);
  const [strengthBuff, setStrengthBuff] = useState(0);
  const [enemyStun, setEnemyStun] = useState(false);
  const [enemyStunCoolDown, setEnemyStunCoolDown] = useState(false);
  const [enemyStatusEffect, setEnemyStatusEffect] = useState("");
  const [randomActionNum, setRandomActionNum] = useState(
    Math.floor(Math.random() * props.enemy.actions.length)
  );

  let healAudio = new Audio("/heal.mp4");

  const healAudioStart = () => {
    healAudio.play();
  };

  let slashAudio = new Audio("/slash.mp4");

  const slashAudioStart = () => {
    slashAudio.play();
  };

  let cardAudio = new Audio("/cardPlay.mp4");

  const cardAudioStart = () => {
    cardAudio.play();
  };

  let defendAudio = new Audio("/defend.mp4");

  const defendAudioStart = () => {
    defendAudio.play();
  };

  const setDefendValueCheck = (value) => {
    if (value < 0) {
      setDefendValue(0);
    } else {
      setDefendValue(value);
    }
  };

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
      const weakness = enemyStatusEffect.includes("Weakness") ? 0.6 : 1;

      const damageTaken = Math.floor(
        props.enemy.actions[randomActionNum].value *
          defendValue *
          vulnerable *
          weakness
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
        setEnemyStatusEffect("");
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
        case "Attack":
          if (props.combatResources.sword < skillUsed.cost) {
            props.setCombatMessage("Not enough resources!");
          } else {
            slashAudioStart();
            props.animateSlash();
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
        case "Heal":
          if (props.combatResources.heart < skillUsed.cost) {
            props.setCombatMessage("Not enough resources!");
          } else {
            healAudioStart();
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
        case "Defend":
          if (props.combatResources.shield < skillUsed.cost) {
            props.setCombatMessage("Not enough resources!");
          } else if (defendValue === 0) {
            props.setCombatMessage(
              `You are already blocking 100% of incoming damage`
            );
          } else if (defendValue !== 1) {
            defendAudioStart();
            props.setCombatMessage(
              `You reinforce your defenses.  Blocking an additional ${
                100 * (props.combatResources.shield * 0.25)
              }% of incoming damage.`
            );
            if (defendValue < props.combatResources.shield * 0.25) {
              setDefendValueCheck(0);
            } else {
              setDefendValueCheck(
                defendValue - props.combatResources.shield * 0.25
              );
              props.setShieldResource(
                -skillUsed.cost * props.combatResources.shield
              );
            }
          } else {
            defendAudioStart();
            props.setCombatMessage(
              skillUsed.message +
                ` Blocking ${
                  100 * props.combatResources.shield * 0.25 < 100
                    ? 100 * props.combatResources.shield * 0.25
                    : 100
                }% of incoming damage.`
            );
            setDefendValueCheck(1 - props.combatResources.shield * 0.25);
            props.setShieldResource(
              -skillUsed.cost * props.combatResources.shield
            );
          }
          break;
        case "Strength Buff":
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
        case "Draw":
          if (props.combatResources.draw < 1) {
            props.setCombatMessage("Not enough resources!");
          } else {
            cardAudioStart();
            const drawAmount = props.combatResources.draw;
            props.setCombatMessage(
              `You enter a meditative state.  Draw ${drawAmount} cards.`
            );
            props.drawCards(drawAmount);
            props.setDrawResource(-drawAmount);
          }

          break;
        case "Stun":
          if (
            (props.combatResources.sword &&
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
        case "Weakness":
          if (props.combatResources.sword && props.combatResources.shield < 1) {
            props.setCombatMessage("Not enough resources!");
          } else {
            props.setCombatMessage(
              skillUsed.message +
                ` The enemy has taken ${Math.floor(
                  skillUsed.value * props.enemyHealth
                )} damage.`
            );
            slashAudioStart();
            props.animateSlash();
            props.setSwordResource(-skillUsed.cost);
            props.setShieldResource(-skillUsed.cost);
            setEnemyStatusEffect("Weakness");

            props.setEnemyHealth(
              props.enemyHealth -
                Math.floor(skillUsed.value * props.enemyHealth)
            );
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
      <div>Defending - {100 * (1 - defendValue)}%</div>
      <div>Player Status Effects: {props.statusEffect}</div>
      <div>Enemy Status Effects: {enemyStatusEffect}</div>
      <br></br>
      <div>Draw pile: {props.drawPileLength}</div>
      <div>Discard pile: {props.discardPileLength}</div>
    </div>
  );
}
