import { Event } from "./../domain/event";
import { EventRepository } from "../repositories/eventRepository";
import { Return } from "../utils/return";
import { Participant } from "../domain/participant";

export class EventService {
  constructor(private repository: EventRepository) {}

  public createEvent(event: Event): Return<Event> {
    try {
      this.repository.create(event);

      return {
        ok: true,
        message: "Event created successfully",
        data: event,
      };
    } catch (erro: any) {
      return {
        ok: false,
        message: erro.message || "Unknown error",
      };
    }
  }

  public addParticipant(
    eventId: string,
    participant: Participant,
  ): Return<Event> {
    try {
      const event = this.repository.findById(eventId);

      if (event.isSoldOut) {
        return { ok: false, message: "Event is sold out" };
      }

      if (event.eventDate < new Date()) {
        return { ok: false, message: "Event already happened" };
      }

      const exists = event.participants.some(
        (p) => p.email === participant.email,
      );
      if (exists) {
        return { ok: false, message: "Participant already registered" };
      }

      event.participants.push(participant);
      this.repository.update(event);

      return {
        ok: true,
        message: "Participant added successfully",
        data: event,
      };
    } catch (error: any) {
      return { ok: false, message: error?.message || "Unknown error" };
    }
  }
}
