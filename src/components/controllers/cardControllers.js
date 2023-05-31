const starterCardsArr = [
	{
		type: "Sword",
		value: 1,
		effect: null,
		key: 1
	},
	{
		type: "Sword",
		value: 1,
		effect: null,
		key: 2
	},
	{
		type: "Sword",
		value: 1,
		effect: null,
		key: 3
	},
	{
		type: "Shield",
		value: 1,
		effect: null,
		key: 4
	},
	{
		type: "Shield",
		value: 1,
		effect: null,
		key: 5
	},
	{
		type: "Shield",
		value: 1,
		effect: null,
		key: 6
	},
	{
		type: "Heart",
		value: 1,
		effect: null,
		key: 7
	},
	{
		type: "Heart",
		value: 1,
		effect: null,
		key: 8
	},
	{
		type: "Heart",
		value: 1,
		effect: null,
		key: 9
	}
];
const eventCards = {
	seerStone: {
		name: "Seer Stone",
		type: "Draw",
		effect: "Exhaust",
		value: 2,
		key: 10
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
