import { createEvent } from "../events/createEvent";

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
