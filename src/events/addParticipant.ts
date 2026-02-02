import { Event } from "./event";
import { Participant } from "./participant";

export function addParticipant(event: Event, participant: Participant): Event {
  if (event.isSoldOut) {
    throw new Error("Event is sold out");
  }

  if (event.eventDate < new Date()) {
    throw new Error("Event already happened");
  }

  event.participants.push(participant);
  return event;
}
