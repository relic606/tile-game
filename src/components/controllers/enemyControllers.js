import goblinImage from "../../assets/enemies/goblin.png";
import ogreImage from "../../assets/enemies/ogre.png";
import slimeImage from "../../assets/enemies/slime.png";
import skeletonImage from "../../assets/enemies/skeleton.png";
import evilKnightImage from "../../assets/enemies/evilknight.png";

////////////////////////////////////////////////////// DL 1 enemies

const hack = {
	forecast: "The goblin raises his axe above his head.",
	message: "The goblin swung his axe at you!",
	value: 15
};
const bite = {
	forecast: "The goblin gnashes his teeth together.",
	message: "The goblin bit you!",
	value: 8,
	effect: "Vulnerable"
};

const goblin = {
	name: "Goblin",
	maxHealth: 80,
	experience: 500,
	actions: [hack, bite],
	image: goblinImage
};

////////////////////////////////////////// DL 1 Boss

const club = {
	forecast: "The ogre grips his club tightly, preparing to swing",
	message: "The ogre slams you with his club!",
	value: 30
};
const bash = {
	forecast: "The ogre clenches his off hand in a fist",
	message: "The ogre bashes you with his off hand.",
	value: 10,
	effect: "Stun"
};
const stomp = {
	forecast: "The ogre raises foot, ready to lunge at you",
	message: "The ogre stomps your toes.",
	value: 15,
	effect: "Slow"
};

const ogre = {
	name: "Ogre",
	maxHealth: 100,
	experience: 1000,
	actions: [club, bash, stomp],
	image: ogreImage
};

//////////////////////////////////////////////////////////////////////

const slimed = {
	forecast: "The slime is looking very slimy.",
	message: "The slime slimes you with its slime!",
	value: 12
};
const envelop = {
	forecast: "The slime is attempting to envelop you!",
	message: "The slime envelops you inside itself.",
	value: 5,
	effect: "Stun"
};
const weakness = {
	forecast:
		"The slime begings to look uncomfortable, as though something is moving inside it.",
	message:
		"The slime leans to one side. You feel weak at the smell of the slime's sudden pungent aroma!",
	value: 8,
	effect: "Weakness"
};

const slime = {
	name: "Slime",
	maxHealth: 50,
	experience: 500,
	actions: [slimed, envelop, weakness],
	image: slimeImage
};

/////////////////////////////////////// DL 2

const slack = {
	forecast: "The boblin raises his axe above his head.",
	message: "The boblin swung his axe at you!",
	effect: "Weakness",
	value: 20
};
const fite = {
	forecast: "The boblin gnashes his teeth together.",
	message: "The boblin bit you!",
	effect: "Vulnerable",
	value: 10
};

const boblin = {
	name: "Boblin",
	maxHealth: 100,
	experience: 700,
	actions: [slack, fite],
	image: goblinImage
};
////////////////////////////////

const stab = {
	forecast: "The skeleton is poised, ready to strike.",
	message: "The skeleton stabs you with his sword!",
	value: 20,
	effect: "Vulnerable"
};
const headbutt = {
	forecast: "The skeleton rears his head back.",
	message: "The skeleton headbutts you!",
	value: 15,
	effect: "Slow"
};

const skeleton = {
	name: "Skeleton",
	maxHealth: 80,
	experience: 500,
	actions: [stab, headbutt],
	image: skeletonImage
};

/////////////////////////////////////////// DL2 boss

const eviscerate = {
	forecast: "The knights blade begins to glow",
	message:
		"The knight strikes you with his blade, searing your skill with unholy energy",
	value: 25
};
const darkCurse = {
	forecast: "The knight begins to chant a dark incantation",
	message: "Your body is assualted by dark energy",
	value: 10,
	effect: "Weakness Vulnerable"
};

const evilKnight = {
	name: "Evil Knight",
	maxHealth: 150,
	experience: 1500,
	actions: [eviscerate, darkCurse],
	image: evilKnightImage
};

///////////////////////////////////////////

const normalEnemiesDL1 = [goblin, slime];
const bossEnemiesDL1 = [ogre];

const normalEnemiesDL2 = [boblin, skeleton];
const bossEnemiesDL2 = [evilKnight];

const normalEnemiesAll = { normalEnemiesDL1, normalEnemiesDL2 };
const bossEnemiesAll = { bossEnemiesDL1, bossEnemiesDL2 };

const enemies = { normalEnemiesAll, bossEnemiesAll };

export { enemies };
