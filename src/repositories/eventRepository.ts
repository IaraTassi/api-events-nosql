import { Event } from "../domain/event";

export interface EventRepository {
  create(event: Event): void;
}
