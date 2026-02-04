import { Event } from "../domain/event";

export interface EventRepository {
  create(event: Event): void;
  findById(id: string): Event;
  update(event: Event): void;
  findAll(): Event[];
  delete(id: string): void;
}
