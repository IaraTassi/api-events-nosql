import { Event } from "./../domain/event";
import { EventRepository } from "../repositories/eventRepository";
import { Return } from "../utils/return";
import { Participant } from "../domain/participant";

export class EventService {
  constructor(private repository: EventRepository) {}

  public createEvent(event: Event): Return<Event> {
    try {
      if (!event.name || !event.description || !event.location) {
        return {
          ok: false,
          message: "Missing required event data",
        };
      }

      if (!event.eventDate) {
        return {
          ok: false,
          message: "Event date is required",
        };
      }

      if (event.eventDate < new Date()) {
        return {
          ok: false,
          message: "Event data must be in the future",
        };
      }

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

  public listEvent(): Return<Event[]> {
    try {
      const events = this.repository.findAll();
      return {
        ok: true,
        message: "List successffuly events",
        data: events,
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message || "Unknown error",
      };
    }
  }

  public markEventAsSoldOut(eventId: string): Return<Event> {
    try {
      const event = this.repository.findById(eventId);

      if (new Date(event.eventDate) < new Date()) {
        return {
          ok: false,
          message: "Event already happened",
        };
      }

      if (!event.participants || event.participants.length === 0) {
        return {
          ok: false,
          message: "Event has no participants",
        };
      }

      event.isSoldOut = true;
      this.repository.update(event);

      return {
        ok: true,
        message: "Event marked as sold out successfully",
        data: event,
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message || "Unknown error",
      };
    }
  }
}
