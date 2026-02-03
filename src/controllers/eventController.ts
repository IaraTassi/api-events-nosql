import { EventService } from "../services/eventService";
import { Event } from "../domain/event";
import { Return } from "../utils/return";
import { Participant } from "../domain/participant";

export class EventController {
  constructor(private service: EventService) {}

  public createEvent(eventData: Event): Return<Event> {
    return this.service.createEvent(eventData);
  }

  public addParticipant(
    eventId: string,
    participant: Participant,
  ): Return<Event> {
    return this.service.addParticipant(eventId, participant);
  }
}
