import { Event } from "./event";

export function makeEventSoldOut(event: Event): Event {
  event.isSoldOut = true;
  return event;
}
