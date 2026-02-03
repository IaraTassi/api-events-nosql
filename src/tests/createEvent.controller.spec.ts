import { EventController } from "../controllers/eventController";
import { createEvent } from "../domain/createEvent";
import { Event } from "../domain/event";
import { InMemoryEventRepository } from "../repositories/inMemoryEventRepository";
import { EventService } from "../services/eventService";

describe("EventController - createEvent", () => {
  let service: EventService;
  let controller: EventController;

  beforeEach(() => {
    const repository = new InMemoryEventRepository();
    service = new EventService(repository);
    controller = new EventController(service);
  });

  it("should call service and return created event", () => {
    const event: Event = createEvent({
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });

    const result = controller.createEvent(event);

    expect(result.ok).toBe(true);
    expect(result.data).toEqual(event);
    expect(result.message).toBe("Event created successfully");
  });
});
