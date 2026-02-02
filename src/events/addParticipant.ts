import { Event } from "./event";
import { Participant } from "./participant";

export function addParticipant(event: Event, participant: Participant): Event {
  if (event.isSoldOut) {
    throw new Error("Event is sold out");
  }

  if (event.eventDate < new Date()) {
    throw new Error("Event already happened");
  }

  const emailAlreadyExists = event.participants.some(
    (p) => p.email === participant.email,
  );
  if (emailAlreadyExists) {
    throw new Error("Participant already registered");
  }

  event.participants.push(participant);
  return event;
}
