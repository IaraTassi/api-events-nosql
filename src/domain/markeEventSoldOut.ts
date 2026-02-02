import { Event } from "./event";

export function makeEventSoldOut(event: Event): Event {
  const now = new Date();

  if (event.eventDate < now) {
    throw new Error("Event already happened");
  }

  if (event.participants.length === 0) {
    throw new Error("Event must have at least one participant");
  }

  event.isSoldOut = true;
  return event;
}
