/////For attack, damage amount is = value * player strength, applied in CombatSkills componenet

const slash = {
	name: "slash",
	message: "You slashed the enemy!",
	actionType: "attack",
	value: 5,
	cost: 1
};

//// heal amount is wisdom*value

const heal = {
	name: "heal",
	message: "You are bathed in holy light.",
	actionType: "heal",
	value: 2,
	cost: 1
};

const defend = {
	name: "defend",
	message: "You take a defensive posture.",
	actionType: "defend",
	value: 0.3,
	cost: 1
};

const draw = {
	name: "draw",
	message: "You channel energy.",
	actionType: "draw"
};

///level 2

///strength is added to player = value * wisdom

const holyStrength = {
	name: "holy strength",
	message: "Your muscles surge with divine strength.",
	actionType: "strength buff",
	value: 1,
	cost: 2
};

const combatSkillsArray = [slash, heal, defend, draw, holyStrength];

export { combatSkillsArray };
