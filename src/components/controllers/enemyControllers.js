import goblinImage from "../../assets/goblin.png";
import ogreImage from "../../assets/ogre.png";
import slimeImage from "../../assets/slime.png";

const hack = {
	forecast: "The goblin raises his axe above his head.",
	message: "The goblin swung his axe at you!",
	value: 10
};
const bite = {
	forecast: "The goblin gnashes his teeth together.",
	message: "The goblin bit you!",
	value: 5
};

const goblin = {
	name: "Goblin",
	maxHealth: 25,
	experience: 1000,
	actions: [hack, bite],
	image: goblinImage
};

//////////////////////////////////////////

const club = {
	forecast: "The ogre grips his club tightly, preparing to swing",
	message: "The ogre slams you with his club!",
	value: 30
};
const bash = {
	forecast: "The ogre clenches his off hand in a fist",
	message: "The ogre bashes you with his off hand.  You are stunned!",
	value: 5,
	effect: "stun"
};
const stomp = {
	forecast: "The ogre raises foot, ready to lunge at you",
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
	forecast: "The slime is looking very slimy.",
	message: "The slime slimes you with its slime!",
	value: 10
};
const envelop = {
	forecast: "The slime moves towards you, menacingly.",
	message: "The slime envelops you inside itself.  You are stunned!",
	value: 5,
	effect: "stun"
};
const weakness = {
	forecast:
		"The slime begings to look uncomfortable, as though something is moving inside it.",
	message:
		"The slime leans to one side. You weakened by the slime's sudden pungent aroma!",
	value: 5,
	effect: "weakness"
};

const slime = {
	name: "Slime",
	maxHealth: 20,
	experience: 1000,
	actions: [slimed, envelop, weakness],
	image: slimeImage
};

const normalEnemies = { goblin, slime };

const bossEnemies = { ogre };

const enemies = { normalEnemies, bossEnemies };

export { enemies };
