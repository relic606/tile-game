import unicornImg from "../../assets/events/unicorn.png";
import seerStoneImg from "../../assets/events/seerStone.jpg";

const unicorn = {
	id: 0,
	image: unicornImg,
	name: "unicorn",
	message:
		"You stumble upon a unicorn drinking from a pond.  It looks upon you with an unnerving calm and nearly despicable cuteness.  It dips its head, and you feel blessed by the mythical creature.  Your health has been restored.",
	type: "health",
	value: 50
};

const seerStone = {
	id: 1,
	image: seerStoneImg,
	name: "Seer Stone",
	message: "Seer Stone grants you the ability to draw more cards.",
	type: "card",
	card: ["Draw", 10, "Exhaust"],
	draw: 2
};
const healthTrap = {
	id: 2,
	image: "",
	name: "Trap",
	message: "You fall into a trap of spikes, taking 20 damage!",
	type: "health",
	value: -20
};
const cardCurse = {
	id: 3,
	image: "",
	name: "Evil Wizard",
	message:
		"An evil wizard appears before you, warning you to abandon your foolish quest.  He gestures with his staff and mutters a curse upon you, before vanishing.",
	type: "card",
	card: ["Curse", 11, "Exhaust"]
};

const events = [unicorn, seerStone, healthTrap, cardCurse];

export { events };

// function EventInput() {
// 	return <input></input>;
// }
