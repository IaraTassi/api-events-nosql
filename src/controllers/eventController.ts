import { EventService } from "../services/eventService";
import { Event } from "../domain/event";
import { Return } from "../utils/return";

export class EventController {
  constructor(private service: EventService) {}
  public createEvent(eventData: Event): Return<Event> {
    return this.service.createEvent(eventData);
  }
}
