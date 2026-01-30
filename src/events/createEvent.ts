import { Event } from "./event";

type CreateEventInput = {
  name: string;
  description: string;
  location: string;
  eventDate: Date;
};

export function createEvent(input: CreateEventInput): Event {
  if (!input.name || input.name.trim() === "") {
    throw new Error("Event name is required");
  }

  if (!input.description || input.description.trim() === "") {
    throw new Error("Event description is required");
  }

  if (!input.location || input.location.trim() === "") {
    throw new Error("Event location is required");
  }

  if (!(input.eventDate instanceof Date) || isNaN(input.eventDate.getTime())) {
    throw new Error("Event eventDate is required");
  }

  return {
    name: input.name,
    description: input.description,
    location: input.location,
    eventDate: input.eventDate,
    isSoldOut: false,
    participants: [],
  };
}
