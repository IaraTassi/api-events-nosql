import { Event } from "./../domain/event";
import { EventRepository } from "./eventRepository";

export class InMemoryEventRepository implements EventRepository {
  private events: Event[] = [];

  create(event: Event): void {
    this.events.push(event);
  }

  findById(id: string): Event {
    const event = this.events.find((e) => e.id === id);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  }

  update(event: Event): void {
    const index = this.events.findIndex((e) => e.id === event.id);
    if (index === -1) throw new Error("Event not found");
    this.events[index] = event;
  }

  findAll(): Event[] {
    return [...this.events];
  }

  delete(id: string): void {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error("Event not found");
    }
    this.events.splice(index, 1);
  }
}
