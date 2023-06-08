import unicornImg from "../../assets/events/unicorn.png";
import seerStoneImg from "../../assets/events/seerStone.jpg";
import { eventCards } from "./cardControllers";
import wizardImage from "../../assets/events/wizard.png";
import spikeTrapImg from "../../assets/events/spiketrap.png";
import gauntletImg from "../../assets/events/gauntlet.png";
import curseImg from "../../assets/events/curse.png";

const unicorn = {
	id: 0,
	image: unicornImg,
	name: "unicorn",
	message:
		"You stumble upon a unicorn drinking from a pond.  It looks upon you with an unnerving calm and nearly despicable cuteness.  It dips its head, and you feel blessed by the mythical creature.  Your health has been restored.",
	type: "health",
	value: 40
};

const seerStone = {
	id: 1,
	image: seerStoneImg,
	name: "Seer Stone",
	message: "Seer Stone grants you the ability to draw more cards.",
	type: "card",
	card: eventCards.seerStone
};
const spikeTrap = {
	id: 2,
	image: spikeTrapImg,
	name: "Spike Trap",
	message: "You fall into a trap of spikes, taking 20 damage!",
	type: "health",
	value: -20
};

const strengthExchange = {
	id: 4,
	image: gauntletImg,
	name: "Strength Exchange",
	message: "You have been granted 3 Strength, at the cost of 1 Widsom.",
	type: "stats",
	statChange: { strength: 3, wisdom: -1 }
};
const wisdomExchange = {
	id: 5,
	image: gauntletImg,
	name: "Wisdom Exchange",
	message: "You have been granted 3 Wisdom, at the cost of 1 Strength.",
	type: "stats",
	statChange: { strength: -1, wisdom: 3 }
};
const minorStrengthGain = {
	id: 6,
	image: gauntletImg,
	name: "Minor Strength Gain",
	message: "You have been granted 2 Strength.",
	type: "stats",
	statChange: { strength: 2 }
};
const minorStrengthLoss = {
	id: 7,
	image: curseImg,
	name: "Minor Strength Loss",
	message: "You have been weakened, losing 1 Strength.",
	type: "stats",
	statChange: { strength: -1 }
};
const minorWisdomLoss = {
	id: 8,
	image: curseImg,
	name: "Minor Wisdom Loss",
	message: "You have been weakened, losing 1 Wisdom.",
	type: "stats",
	statChange: { wisdom: -1 }
};
const minorWisdomGain = {
	id: 9,
	image: gauntletImg,
	name: "Minor Wisdom Gain",
	message: "You have been granted 2 Wisdom.",
	type: "stats",
	statChange: { wisdom: 2 }
};

const events = [
	unicorn,
	seerStone,
	spikeTrap,
	strengthExchange,
	wisdomExchange,
	minorStrengthGain,
	minorStrengthLoss,
	minorWisdomLoss,
	minorWisdomGain
];

////////////////////// Special Events

const cardCurse = {
	id: 3,
	image: wizardImage,
	name: "Evil Wizard",
	message:
		"An evil wizard appears before you, warning you to abandon your foolish quest.  He gestures with his staff and mutters a curse upon you, before vanishing.",
	type: "card",
	card: eventCards.cardCurse
};
const specialEvents = { cardCurse };

export { events, specialEvents };
