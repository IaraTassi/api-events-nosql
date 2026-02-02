import { Event } from "./event";

export function deleteEvent(events: Event[], eventId: string): void {
  const index = events.findIndex((e) => e.id === eventId);

  if (index === -1) {
    throw new Error("Event not found");
  }

  events.splice(index, 1);
}
