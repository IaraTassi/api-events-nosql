import { Event } from "./event";

export function makeEventSoldOut(event: Event): Event {
  const now = new Date();

  if (event.eventDate < now) {
    throw new Error("Event already happened");
  }

  event.isSoldOut = true;
  return event;
}
