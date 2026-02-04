import { createEvent } from "../../../src/domain/createEvent";
import { InMemoryEventRepository } from "../../../src/repositories/inMemoryEventRepository";
import { EventService } from "../../../src/services/eventService";

describe("EventService - deleteEvent", () => {
  let repository: InMemoryEventRepository;
  let service: EventService;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    service = new EventService(repository);
  });

  it("should delete an existing event successfully", () => {
    const event = createEvent({
      name: "Tech Conference",
      description: "Event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });
    repository.create(event);

    const result = service.deleteEvent(event.id);

    expect(result.ok).toBe(true);
    expect(result.message).toBe("Event deleted successfully");
    expect(() => repository.findById(event.id)).toThrow("Event not found");
  });

  it("should fail when trying to delete a non-existing event", () => {
    const result = service.deleteEvent("invalid-id");

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Event not found");
  });
});
