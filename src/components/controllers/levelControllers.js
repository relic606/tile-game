import { combatSkills } from "./combatControllers";
import { levelCards } from "./cardControllers";

export const levelTables = {
	2: {
		expToNextLevel: 500,
		maxHealth: 10,
		strength: 2,
		wisdom: 1,
		skills: combatSkills.holyStrength,
		card: levelCards.cleanse
	},
	3: {
		expToNextLevel: 99999,
		maxHealth: 10,
		strength: 2,
		wisdom: 1,
		card: levelCards.channel
	}
};
