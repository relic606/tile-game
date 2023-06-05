import React, { useEffect, useState } from "react";

export default function EventTile(props) {
	const event = props.event;

	const updateStats = (stats) => {
		if (stats.strength) {
			props.changeStrength(stats.strength);
		}
		if (stats.wisdom) {
			props.changeWisdom(stats.wisdom);
		}
	};

	useEffect(() => {
		function shuffle(array) {
			let currentIndex = array.length,
				randomIndex;
			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [
					array[randomIndex],
					array[currentIndex]
				];
			}
			return array;
		}

		function checkEventId(e) {
			return e.id !== event.id;
		}

		let newEventsArray = props.eventsArray.filter(checkEventId);
		if (newEventsArray.length !== 0) {
			props.setEventsArray(shuffle(newEventsArray));
		} else {
			alert("No events left");
		}

		switch (event.type) {
			case "health":
				props.healthChange(event.value);
				break;
			case "card":
				props.addCardToDeck(event.card);
				break;
			case "stats":
				updateStats(event.statChange);
				break;
			default:
				alert("Event type not recognized.");
		}
	}, []);
	return (
		<div className="event-tile">
			<img className="event-image" src={event.image} alt="event_img" />
			<p>{event.message}</p>
			<div></div>
			<button onClick={props.isHiddenToggle}>End Event</button>
		</div>
	);
}
