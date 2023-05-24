import { useEffect } from "react";

export default function EventTile(props) {
	const event = props.event;

	useEffect(() => {
		switch (event.type) {
			case "health":
				console.log("health");
				props.healthChange(event.value);
				break;
			case "card":
				console.log("card");
				props.addCardToDeck(event.card);
				break;
			default:
				alert("Event type not recognized.");
		}
	}, []);

	return (
		<div className="event-tile">
			<img className="event-image" src={props.event.image} alt="event_img" />
			<p>{props.event.message}</p>
			<button onClick={props.isHiddenToggle}>End Event</button>
		</div>
	);
}
