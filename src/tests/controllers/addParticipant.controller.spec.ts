import { EventController } from "../../controllers/eventController";
import { createEvent } from "../../domain/createEvent";
import { Participant } from "../../domain/participant";
import { EventService } from "../../services/eventService";

describe("EventController - addParticipant", () => {
  let controller: EventController;
  let service: jest.Mocked<EventService>;

  beforeEach(() => {
    service = {
      addParticipant: jest.fn(),
    } as any;

    controller = new EventController(service);
  });

  it("should return success when service succeeds", () => {
    const participant: Participant = {
      name: "Carolina",
      email: "carolina@example.com",
    };

    const event = createEvent({
      name: "Tech Conference",
      description: "Event about tech",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });

    service.addParticipant.mockReturnValue({
      ok: true,
      message: "Participant added successfully",
      data: event,
    });

    const result = controller.addParticipant("event-1", participant);

    expect(service.addParticipant).toHaveBeenCalledWith("event-1", participant);
    expect(result.ok).toBe(true);
    expect(result.data).toBe(event);
  });

  it("should return error when service fails", () => {
    const participant: Participant = {
      name: "Ana",
      email: "ana@example.com",
    };

    service.addParticipant.mockReturnValue({
      ok: false,
      message: "Event not found",
    });

    const result = controller.addParticipant("invalid-id", participant);

    expect(service.addParticipant).toHaveBeenCalledWith(
      "invalid-id",
      participant,
    );
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Event not found");
  });
});
