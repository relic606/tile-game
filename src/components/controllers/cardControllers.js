import swordImg from "../../assets/sword.png";
import shieldImg from "../../assets/shield.png";
import heartImg from "../../assets/heart.png";
import cardImg from "../../assets/cards1.png";
import waterImg from "../../assets/water.png";
import curseImg from "../../assets/curse.png";

const levelCards = {
	cleanse: {
		name: "Cleanse",
		type: "Draw Cleanse",
		value: 1,
		key: 10,
		effect: "Exhaust",
		image: cardImg,
		imageTwo: waterImg
	},
	channel1: {
		name: "Channel",
		type: "Draw",
		value: 2,
		key: 11,
		image: cardImg
	},

	channel2: {
		name: "Channel",
		type: "Draw",
		value: 2,
		key: 12,
		image: cardImg
	},
	holyBlade: {
		name: "Holy Blade",
		type: "Sword",
		value: 3,
		key: 13,
		// effect: "Exhaust",
		image: swordImg
	},
	shieldWall: {
		name: "Shield Wall",
		type: "Shield",
		value: 2,
		key: 14,
		effect: "Exhaust",
		image: shieldImg
	},
	divineInspiration: {
		name: "Divine Inspiration",
		type: "Heart",
		value: 2,
		key: 15,
		effect: "Exhaust",
		image: heartImg
	}
};
const starterCardsArr = [
	{
		type: "Sword",
		value: 1,
		effect: null,
		key: 1,
		image: swordImg
	},
	{
		type: "Sword",
		value: 1,
		effect: null,
		key: 2,
		image: swordImg
	},
	{
		type: "Sword",
		value: 1,
		effect: null,
		key: 3,
		image: swordImg
	},
	{
		type: "Shield",
		value: 1,
		effect: null,
		key: 4,
		image: shieldImg
	},
	{
		type: "Shield",
		value: 1,
		effect: null,
		key: 5,
		image: shieldImg
	},
	{
		type: "Shield",
		value: 1,
		effect: null,
		key: 6,
		image: shieldImg
	},
	{
		type: "Heart",
		value: 1,
		effect: null,
		key: 7,
		image: heartImg
	},
	{
		type: "Heart",
		value: 1,
		effect: null,
		key: 8,
		image: heartImg
	},
	{
		type: "Heart",
		value: 1,
		effect: null,
		key: 9,
		image: heartImg
	},
	levelCards.holyBlade,
	levelCards.channel1,
	levelCards.divineInspiration,
	levelCards.shieldWall
];
const eventCards = {
	seerStone: {
		name: "Seer Stone",
		type: "Draw",
		effect: "Exhaust",
		value: 2,
		key: 30,
		image: cardImg
	},
	cardCurse: {
		name: "Wizard's Curse",
		type: "Curse",
		effect: "Exhaust",
		key: 31,
		image: curseImg
	}
};

export { starterCardsArr, eventCards, levelCards };
