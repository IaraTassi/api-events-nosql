import { createEvent } from "../events/createEvent";
import { addParticipant } from "../events/addParticipant";

describe("Create Event", () => {
  it("should create an event with default values", () => {
    const input = {
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    };

    const event = createEvent(input);

    expect(event).toBeDefined();
    expect(event.isSoldOut).toBe(false);
    expect(event.participants).toEqual([]);
    expect(event.participants).toHaveLength(0);
    expect(event.name).toBe(input.name);
    expect(event.description).toBe(input.description);
    expect(event.location).toBe(input.location);
  });

  it("should not create an event without name", () => {
    const input = {
      name: "",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    };

    expect(() => createEvent(input)).toThrow("Event name is required");
  });

  it("should not create an event without description", () => {
    const input = {
      name: "Tech Conference",
      description: "",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    };

    expect(() => createEvent(input)).toThrow("Event description is required");
  });

  it("should not create an event without location", () => {
    const input = {
      name: "Tech Conference",
      description: "An event about technology",
      location: "",
      eventDate: new Date("2030-01-01"),
    };

    expect(() => createEvent(input)).toThrow("Event location is required");
  });

  it("should not create an event without eventDate", () => {
    const input = {
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date(""),
    };

    expect(() => createEvent(input)).toThrow("Event eventDate is required");
  });
});

describe("Add participant to event", () => {
  it("should add a participant to an event", () => {
    const event = {
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
      isSoldOut: false,
      participants: [],
    };

    const participant = {
      name: "Carolina Souza",
      email: "carolina.souza@example.com",
    };

    const updatedEvent = addParticipant(event, participant);

    expect(updatedEvent.participants).toHaveLength(1);

    const [firstParticipant] = updatedEvent.participants;

    expect(firstParticipant).toBeDefined();
    expect(firstParticipant!.name).toBe(participant.name);
    expect(firstParticipant!.email).toBe(participant.email);
  });

  it("should not add participant to a sold out event", () => {
    const event = {
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
      isSoldOut: true,
      participants: [],
    };

    const participant = {
      name: "Carolina Souza",
      email: "carolina.souza@example.com",
    };

    expect(() => addParticipant(event, participant)).toThrow(
      "Event is sold out",
    );
  });

  it("should not add participant to an event that already happened", () => {
    const event = {
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2026-02-02"),
      isSoldOut: false,
      participants: [],
    };

    const participant = {
      name: "Carolina Souza",
      email: "carolina.souza@example.com",
    };

    expect(() => addParticipant(event, participant)).toThrow(
      "Event already happened",
    );
  });

  it("should not add a participant with duplicated email", () => {
    const event = {
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
      isSoldOut: false,
      participants: [
        {
          name: "Carolina Souza",
          email: "carolina.souza@example.com",
        },
      ],
    };

    const participant = {
      name: "Outro Participante",
      email: "carolina.souza@example.com",
    };

    expect(() => addParticipant(event, participant)).toThrow(
      "Participant already registered",
    );
  });
});
