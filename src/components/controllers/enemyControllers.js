import goblinImage from "../../assets/goblin.png";
import ogreImage from "../../assets/ogre.png";
import slimeImage from "../../assets/slime.png";

const hack = {
	message: "The goblin swung his axe at you!",
	value: 10
};
const bite = {
	message: "The goblin bit you!",
	value: 5
};

const goblin = {
	name: "Goblin",
	maxHealth: 25,
	experience: 200,
	actions: [hack, bite],
	image: goblinImage
};

//////////////////////////////////////////

const club = {
	message: "The ogre slams you with his club!",
	value: 30
};
const bash = {
	message: "The ogre bashes you with his off hand.  You are stunned!",
	value: 5,
	effect: "stun"
};
const stomp = {
	message: "The ogre stomps your toes.",
	value: 10
};

const ogre = {
	name: "Ogre",
	maxHealth: 30,
	experience: 1000,
	actions: [club, bash, stomp],
	image: ogreImage
};

//////////////////////////////////////////////////////////////////////

const slimed = {
	message: "The slime slimes you with its slime!",
	value: 10
};
const envelop = {
	message: "The slime envelops you inside itself.  You are stunned!",
	value: 5,
	effect: "stun"
};
const weakness = {
	message:
		"The slime leans to one side. You weakened by the slime's sudden pungent aroma!",
	value: 5,
	effect: "weakness"
};

const slime = {
	name: "Slime",
	maxHealth: 20,
	experience: 200,
	actions: [slimed, envelop, weakness],
	image: slimeImage
};

const normalEnemies = { goblin, slime };

const bossEnemies = { ogre };

const enemies = { normalEnemies, bossEnemies };

export { enemies };
