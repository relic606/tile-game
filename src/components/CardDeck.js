import React, { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function CardDeck(props) {
  const statusEffectArr = ["Weakness", "Stun", "Vulnerable"];

  let cardAudio = new Audio("/cardPlay.mp4");

  const cardAudioStart = () => {
    cardAudio.play();
  };

  let stunAudio = new Audio("/stunned.mp4");

  const stunAudioStart = () => {
    stunAudio.play();
  };

  const handleNewHand = () => {
    const newHand = [...props.currentHand];
    const newDrawPile = [...props.drawPile];
    for (let i = 0; i < 4; i++) {
      newHand.push(newDrawPile.shift());
    }
    props.setCurrentHand(newHand);
    props.setDrawPile(newDrawPile);
  };

  const discardCard = (e) => {
    const selectedCardKey = Number(e.target.getAttribute("cardKey"));

    const checkCardID = props.currentHand.filter(
      (card) => selectedCardKey === card.key
    );

    const keyOfRmvCard = checkCardID[0].key;

    const newCurrentHand = props.currentHand.filter(
      (card) => card.key !== keyOfRmvCard
    );

    props.setCurrentHand(newCurrentHand);

    const cardRemoved = props.cardDeck.filter(
      (card) => card.key === keyOfRmvCard
    );

    props.setDiscardPile([...props.discardPile, cardRemoved[0]]);
  };
  const exhaustCard = (e) => {
    const selectedCardKey = Number(e.target.getAttribute("cardKey"));
    const checkCardKey = props.currentHand.filter(
      (card) => selectedCardKey === card.key
    );
    const keyOfRmvCard = checkCardKey[0].key;

    const newCurrentHand = props.currentHand.filter(
      (card) => card.key !== keyOfRmvCard
    );

    props.setCurrentHand(newCurrentHand);
  };

  const handleCardClick = (event) => {
    const cardUsed = props.currentHand.filter((card) => {
      return card.key === Number(event.target.getAttribute("cardKey"));
    })[0];

    const curseInHandBoolean =
      props.currentHand.filter((card) => {
        return card.type === "Curse";
      }).length !== 0;

    if (
      props.statusEffect.includes("Stun") &&
      !cardUsed.type.includes("Cleanse")
    ) {
      stunAudioStart();
      props.setCombatMessage("You cannot play a card while stunned");
    } else if (
      !cardUsed.type.includes("Curse") &&
      curseInHandBoolean &&
      !cardUsed.type.includes("Cleanse")
    ) {
      props.setCombatMessage(
        "You must break through the curse's hold of you before taking action."
      );
    } else {
      cardAudioStart();
      if (cardUsed.effect === "Exhaust") {
        exhaustCard(event);
      } else {
        discardCard(event);
      }

      const cardTypeArr = cardUsed.type.split(" ");

      while (cardTypeArr.length > 0) {
        switch (cardTypeArr[0]) {
          case "Sword":
            props.setSwordResource(cardUsed.value);
            cardTypeArr.shift();
            break;
          case "Shield":
            props.setShieldResource(cardUsed.value);
            cardTypeArr.shift();
            break;
          case "Heart":
            props.setHeartResource(cardUsed.value);
            cardTypeArr.shift();
            break;
          case "Draw":
            props.setDrawResource(cardUsed.value);
            cardTypeArr.shift();

            break;
          case "Curse":
            cardTypeArr.shift();
            const randomStatusEff =
              statusEffectArr[
                Math.floor(Math.random() * statusEffectArr.length)
              ];
            props.setCombatMessage(
              `Your energy has been sapped by a mysterious force: ${randomStatusEff}`
            );
            props.addStatusEffect(randomStatusEff);

            break;
          case "Cleanse":
            cardTypeArr.shift();
            props.setCombatMessage("You have been cleansed of your ailments.");
            props.setStatusEffect("");

            break;
          default:
            alert("card not recognized");
        }
      }
    }
  };

  useEffect(() => {
    cardAudioStart();
    handleNewHand();
  }, []);
  return (
    <div className="card-deck-container">
      <TransitionGroup>
        {props.currentHand.map((card) => (
          <CSSTransition
            key={card.key}
            timeout={250}
            classNames="card-transition"
          >
            <div
              ref={card.nodeRef}
              className="card"
              onClick={handleCardClick}
              key={card.key}
              cardkey={card.key}
              effect={card.effect}
            >
              {card.name ? (
                <p
                  className="card-title"
                  onClick={handleCardClick}
                  cardkey={card.key}
                >
                  {card.name}
                </p>
              ) : null}

              <div
                className="card-image"
                onClick={handleCardClick}
                cardkey={card.key}
              >
                <img
                  src={card.image}
                  alt="card_img"
                  className="card-image"
                  onClick={handleCardClick}
                  cardkey={card.key}
                />
                {card.value > 1 ? (
                  <p onClick={handleCardClick} cardkey={card.key}>
                    x{card.value}
                  </p>
                ) : null}
                {card.imageTwo ? (
                  <img
                    src={card.imageTwo}
                    alt="card_img"
                    className="card-image"
                    onClick={handleCardClick}
                    cardkey={card.key}
                  />
                ) : null}
              </div>
              {card.effect ? (
                <div
                  onClick={handleCardClick}
                  className="card-effect"
                  cardkey={card.key}
                >
                  {card.effect}
                </div>
              ) : null}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
