import { addParticipant } from "../../../src/domain/addParticipant";
import { createEvent } from "../../../src/domain/createEvent";
import { InMemoryEventRepository } from "../../../src/repositories/inMemoryEventRepository";
import { EventService } from "../../../src/services/eventService";

describe("EventService - markEventAsSoldOut", () => {
  let repository: InMemoryEventRepository;
  let service: EventService;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    service = new EventService(repository);
  });

  it("should mark event as sold out when event has participants", () => {
    const event = createEvent({
      name: "Tech Conference",
      description: "Event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });
    repository.create(event);

    service.addParticipant(event.id, {
      name: "Carolina Souza",
      email: "carolina.souza@example.com",
    });

    const result = service.markEventAsSoldOut(event.id);

    expect(result.ok).toBe(true);
    expect(result.data?.isSoldOut).toBe(true);
  });
});
