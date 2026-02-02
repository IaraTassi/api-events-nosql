import { Event } from "./event";
import { Participant } from "./participant";

export function addParticipant(event: Event, participant: Participant): Event {
  if (event.isSoldOut) {
    throw new Error("Event is sold out");
  }

  event.participants.push(participant);
  return event;
}
