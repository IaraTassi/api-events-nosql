import { InMemoryEventRepository } from "../../../src/repositories/inMemoryEventRepository";
import { EventService } from "../../../src/services/eventService";

describe("EventService - listEvent", () => {
  let repository: InMemoryEventRepository;
  let service: EventService;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    service = new EventService(repository);
  });

  it("should return empty array when no events exist", () => {
    const result = service.listEvent();

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.data).toEqual([]);
  });

  it("should list events successfully when events exist", () => {
    repository.create({
      id: "1",
      name: "Tech Conference",
      description: "Event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
      isSoldOut: false,
      participants: [
        {
          name: "Carolina Souza",
          email: "carolina.souza@example.com",
        },
      ],
    });

    const result = service.listEvent();

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.data).toHaveLength(1);

    const [firstEvent] = result.data ?? [];

    expect(firstEvent).toBeDefined();
    expect(firstEvent!.name).toBe("Tech Conference");
  });
});
