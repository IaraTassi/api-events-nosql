import { Event } from "./../domain/event";
import { EventRepository } from "./eventRepository";

export class InMemoryEventRepository implements EventRepository {
  private events: Event[] = [];

  create(event: Event): void {
    this.events.push(event);
  }
}
