import { createEvent } from "../../../src/domain/createEvent";
import { Participant } from "../../../src/domain/participant";
import { InMemoryEventRepository } from "../../../src/repositories/inMemoryEventRepository";
import { EventService } from "../../../src/services/eventService";

describe("EventService - addParticipant", () => {
  let repository: InMemoryEventRepository;
  let service: EventService;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
    service = new EventService(repository);
  });

  it("should add a participant successfully", () => {
    const event = createEvent({
      name: "Tech Conference",
      description: "Event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });
    repository.create(event);

    const participant: Participant = {
      name: "Carolina Souza",
      email: "carolina.souza@example.com",
    };

    const result = service.addParticipant(event.id, participant);

    expect(result.ok).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data!.participants).toHaveLength(1);
    expect(result.data!.participants[0]!.email).toBe(participant.email);
  });

  it("should not add participant if event is sold out", () => {
    const event = createEvent({
      name: "Sold Out Event",
      description: "Event fully booked",
      location: "Rio",
      eventDate: new Date("2030-01-01"),
    });
    event.isSoldOut = true;
    repository.create(event);

    const participant: Participant = {
      name: "João",
      email: "joao@example.com",
    };

    const result = service.addParticipant(event.id, participant);

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Event is sold out");
  });

  it("should not add participant if event already happened", () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);

    const event = createEvent({
      name: "Past Event",
      description: "Event in the past",
      location: "SP",
      eventDate: pastDate,
    });
    repository.create(event);

    const participant: Participant = {
      name: "Maria",
      email: "maria@example.com",
    };

    const result = service.addParticipant(event.id, participant);

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Event already happened");
  });

  it("should not add participant with duplicate email", () => {
    const event = createEvent({
      name: "Tech Conference",
      description: "Event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });
    repository.create(event);

    const participant: Participant = {
      name: "Carolina",
      email: "carolina@example.com",
    };
    service.addParticipant(event.id, participant);

    const result = service.addParticipant(event.id, participant);

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Participant already registered");
  });

  it("should return false if event does not exist", () => {
    const participant: Participant = { name: "Ana", email: "ana@example.com" };

    const result = service.addParticipant("non-existent-id", participant);

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Event not found");
  });
});
