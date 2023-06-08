import { combatSkills } from "./combatControllers";
import { levelCards } from "./cardControllers";

export const levelTables = {
	2: {
		expToNextLevel: 1000,
		maxHealth: 10,
		strength: 2,
		wisdom: 2,
		skills: combatSkills.holyStrength,
		card: levelCards.cleanse
	},
	3: {
		expToNextLevel: 1500,
		maxHealth: 10,
		strength: 2,
		wisdom: 2,
		card: levelCards.channel2,
		skills: combatSkills.holySmite
	},
	4: {
		expToNextLevel: 1500,
		maxHealth: 10,
		strength: 2,
		wisdom: 2
	},
	5: {
		expToNextLevel: 999999,
		maxHealth: 10,
		strength: 2,
		wisdom: 2
	}
};
