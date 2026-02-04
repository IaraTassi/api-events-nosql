import { EventController } from "../../../src/controllers/eventController";
import { EventService } from "../../../src/services/eventService";
import { Event } from "../../../src/domain/event";

describe("EventController - createEvent", () => {
  let controller: EventController;
  let service: jest.Mocked<EventService>;

  beforeEach(() => {
    service = {
      createEvent: jest.fn(),
    } as any;

    controller = new EventController(service);
  });

  it("should call service and return created event", () => {
    const event: Event = {
      id: "event-1",
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
      isSoldOut: false,
      participants: [],
    };

    service.createEvent.mockReturnValue({
      ok: true,
      message: "Event created successfully",
      data: event,
    });

    const result = controller.createEvent(event);

    expect(service.createEvent).toHaveBeenCalledWith(event);
    expect(result.ok).toBe(true);
    expect(result.data).toBe(event);
  });

  it("should return when service fails", () => {
    const event: Event = {
      id: "event-1",
      name: "Tech Conference",
      description: "An event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
      isSoldOut: false,
      participants: [],
    };

    service.createEvent.mockReturnValue({
      ok: false,
      message: "Invalid event data",
    });

    const result = controller.createEvent(event);

    expect(service.createEvent).toHaveBeenCalledWith(event);
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Invalid event data");
  });
});
