import { Event } from "./../domain/event";
import { EventRepository } from "../repositories/eventRepository";
import { Return } from "../utils/return";

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
}
