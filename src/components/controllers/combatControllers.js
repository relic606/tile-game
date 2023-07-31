import swordImg from "../../assets/sword.png";
import shieldImg from "../../assets/shield.png";
import heartImg from "../../assets/heart.png";
import drawImg from "../../assets/cards1.png";
import moveImg from "../../assets/wasd.png";
import waterImg from "../../assets/water.png";
import swordHeartImg from "../../assets/sword-heart.png";
import shieldHeartImg from "../../assets/shield-heart.png";
import swordShieldImg from "../../assets/sword-shield.png";
import swordShieldHeartImg from "../../assets/sword-heart-shield.png";

/////For attack, damage amount is = value * player strength, applied in CombatSkills componenet

const slash = {
  name: "Slash",
  message: "You slashed the enemy!",
  actionType: "Attack",
  value: 1,
  cost: 1,
  description:
    "Slash the enemy for damage equal to your strength, per resource.",
  image: swordImg,
};

//// heal amount is wisdom*value

const heal = {
  name: "Heal",
  message: "You are bathed in holy light.",
  actionType: "Heal",
  value: 1,
  cost: 1,
  description:
    "Heal yourself for an amount equal to your wisdom, per resource.",
  image: heartImg,
};

const defend = {
  name: "Defend",
  message: "You take a defensive posture.",
  actionType: "Defend",
  value: 0.25,
  cost: 1,
  description: "Defend 25% of incoming damage, per resource.",
  image: shieldImg,
};

const draw = {
  name: "Draw",
  message: "You channel energy.",
  actionType: "Draw",
  description: "Draw 1 card, per resource.",
  image: drawImg,
};

///strength is added to player = value * wisdom

const holyStrength = {
  name: "Holy Strength",
  message: "Your muscles surge with divine strength.",
  actionType: "Strength Buff",
  value: 0.5,
  cost: 1,
  description:
    "Add strength at the value of 1/2 your wisdom, per resource, for this turn only.",
  image: heartImg,
};
const holySmite = {
  name: "Holy Smite",
  message: "You smite the enemy, stunning them!",
  actionType: "Stun",
  cost: 1,
  description: "Stun the enemy for this turn.  Usable once per Combat.",
  image: swordShieldHeartImg,
};
const weakeningFlurry = {
  name: "Weakening Flurry",
  message: "You unleash a flurry of blows, weakening the enemy!",
  actionType: "Weakness",
  value: 0.1,
  cost: 1,
  description:
    "Deal damage equal to 10% of the enemy's current health, also applying weakness to the enemy for this turn.",
  image: swordShieldImg,
};

const combatSkills = {
  slash,
  heal,
  defend,
  draw,
  holyStrength,
  holySmite,
  weakeningFlurry,
};

export { combatSkills };
