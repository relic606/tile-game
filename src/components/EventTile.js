import React, { useEffect } from "react";

export default function EventTile(props) {
	const event = props.event;

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
			default:
				alert("Event type not recognized.");
		}
	}, []);
	return (
		<div className="event-tile">
			<img className="event-image" src={event.image} alt="event_img" />
			<p>{event.message}</p>
			<button onClick={props.isHiddenToggle}>End Event</button>
		</div>
	);
}
