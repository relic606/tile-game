import { combatSkills } from "./combatControllers";
import { levelCards } from "./cardControllers";

export const levelTables = {
	2: {
		expToNextLevel: 500,
		maxHealth: 20,
		strength: 2,
		wisdom: 1,
		skills: combatSkills.holyStrength
	},
	3: {
		expToNextLevel: 99999,
		maxHealth: 20,
		strength: 2,
		wisdom: 1,
		card: levelCards.cleanse
	}
};
