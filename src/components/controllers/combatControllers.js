/////For attack, damage amount is = value * player strength, applied in CombatSkills componenet

const slash = {
	name: "Slash",
	message: "You slashed the enemy!",
	actionType: "attack",
	value: 3,
	cost: 1,
	description:
		"Slash the enemy for damage equal to your strength, per resource."
};

//// heal amount is wisdom*value

const heal = {
	name: "Heal",
	message: "You are bathed in holy light.",
	actionType: "heal",
	value: 2,
	cost: 1,
	description: "Heal yourself for an amount equal to your wisdom, per resource."
};

const defend = {
	name: "Defend",
	message: "You take a defensive posture.",
	actionType: "defend",
	value: 0.25,
	cost: 1,
	description: "Defend for 30% of oncoming damage, per resource."
};

const draw = {
	name: "Draw",
	message: "You channel energy.",
	actionType: "draw",
	description: "Draw 1 card, per resource."
};

///level 2

///strength is added to player = value * wisdom

const holyStrength = {
	name: "Holy Strength",
	message: "Your muscles surge with divine strength.",
	actionType: "strength buff",
	value: 1,
	cost: 1,
	description:
		"Add strength at the value of your wisdom, per resource, for this turn only."
};

const combatSkills = { slash, heal, defend, draw, holyStrength };

export { combatSkills };
