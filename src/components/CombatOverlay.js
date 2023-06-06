import React, { useState } from "react";
import CombatInteraction from "./combatInteraction";

export default function CombatOverlay(props) {
	const [turn, setTurn] = useState(1);
	const turnIncr = () => {
		setTurn((turn) => turn + 1);
	};
	const setTurnCB = () => {
		setTurn(1);
	};

	const [swordResource, setSwordResource] = useState(0);
	const [shieldResource, setShieldResource] = useState(0);
	const [heartResource, setHeartResource] = useState(0);
	const [drawResource, setDrawResource] = useState(0);

	const setNewSwordResource = (x) => {
		setSwordResource(combatResources.sword + x);
	};
	const setNewShieldResource = (x) => {
		setShieldResource(combatResources.shield + x);
	};
	const setNewHeartResource = (x) => {
		setHeartResource(combatResources.heart + x);
	};
	const setNewDrawResource = (x) => {
		setDrawResource(combatResources.draw + x);
	};

	const combatResources = {
		sword: swordResource,
		heart: heartResource,
		shield: shieldResource,
		draw: drawResource
	};

	if (!props.inCombat) {
		return <div className="no-combat"></div>;
	} else {
		return (
			<div className="combat">
				<div className="combat-content">
					<div className="player-combat-div"></div>
					<EnemyImage enemyImage={props.enemy.image}></EnemyImage>
				</div>
				<CombatInteraction
					setBoss={props.setBoss}
					enemyPool={props.enemyPool}
					setEnemyPool={props.setEnemyPool}
					enemies={props.enemies}
					setExperience={props.setExperience}
					setSwordResource={setNewSwordResource}
					setShieldResource={setNewShieldResource}
					setHeartResource={setNewHeartResource}
					setDrawResource={setNewDrawResource}
					drawResource={drawResource}
					cardDeck={props.player.cardDeckTest}
					combatResources={combatResources}
					setHealthToMax={props.setHealthToMax}
					inCombat={props.inCombat}
					inCombatChange={props.inCombatChange}
					healthChange={props.healthChange}
					turn={turn}
					setTurn={setTurnCB}
					turnIncr={turnIncr}
					player={props.player}
					enemy={props.enemy}
					setEnemy={props.setEnemy}
					bossFight={props.bossFight}
					setBossFight={props.setBossFight}
					dungeonFloorIncr={props.dungeonFloorIncr}
					dungeonFloor={props.dungeonFloor}
					setEvent={props.setEvent}
					eventIsHiddenToggle={props.eventIsHiddenToggle}
				></CombatInteraction>
			</div>
		);
	}
}
function EnemyImage(props) {
	return (
		<div style={{ position: "relative" }}>
			<div className="enemy-combat-div">
				<img src={props.enemyImage} alt="enemy"></img>
			</div>
		</div>
	);
}
