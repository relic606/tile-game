import swordImg from "../../assets/sword.png";
import shieldImg from "../../assets/shield.png";
import heartImg from "../../assets/heart.png";
import cardImg from "../../assets/cards1.png";

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
	}
];
const eventCards = {
	seerStone: {
		name: "Seer Stone",
		type: "Draw",
		effect: "Exhaust",
		value: 2,
		key: 10,
		image: cardImg
	},
	cardCurse: {
		name: "Wizard's Curse",
		type: "Curse",
		effect: "Exhaust",
		key: 11
	}
};

const levelCards = { cleanse: { type: "Cleanse", key: 13, effect: "Exhaust" } };

export { starterCardsArr, eventCards, levelCards };
