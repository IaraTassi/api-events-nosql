import { createEvent } from "../../../src/domain/createEvent";
import { EventRepository } from "../../../src/repositories/eventRepository";
import { InMemoryEventRepository } from "../../../src/repositories/inMemoryEventRepository";
import { EventService } from "../../../src/services/eventService";

describe("EventService - craeteEvent", () => {
  let repository: EventRepository;
  let service: EventService;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    service = new EventService(repository);
  });

  it("should create an event successfuly", () => {
    const event = createEvent({
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });
    const result = service.createEvent(event);

    expect(result.ok).toBe(true);
    expect(result.data).toEqual(event);
    expect(result.message).toBe("Event created successfully");
  });

  it("should return error if repository throws", () => {
    jest.spyOn(repository, "create").mockImplementation(() => {
      throw new Error("Repository failure");
    });
    const event = createEvent({
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });
    const result = service.createEvent(event);

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Repository failure");
    expect(result.data).toBeUndefined();
  });

  it("should return error if input validation fails", () => {
    expect(() =>
      createEvent({
        name: "",
        description: "An event about technology",
        location: "São Paulo",
        eventDate: new Date("2030-01-01"),
      }),
    ).toThrow("Event name is required");
  });
});
