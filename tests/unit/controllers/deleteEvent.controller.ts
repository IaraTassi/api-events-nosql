import { EventController } from "../../../src/controllers/eventController";
import { EventService } from "../../../src/services/eventService";

describe("", () => {
  let controller: EventController;
  let service: jest.Mocked<EventService>;

  beforeEach(() => {
    service = {
      deleteEvent: jest.fn(),
    } as any;

    controller = new EventController(service);
  });

  it("should return success when service removed succeeds", () => {
    service.deleteEvent.mockReturnValue({
      ok: true,
      message: "Event deleted successfully",
    });

    const result = controller.deleteEvent("1");

    expect(result.ok).toBe(true);
    expect(service.deleteEvent).toHaveBeenCalledWith("1");
  });

  it("should return error when service deleteEvent fails", () => {
    service.deleteEvent.mockReturnValue({
      ok: false,
      message: "Event not found",
    });

    const result = controller.deleteEvent("invalid-id");

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Event not found");
    expect(service.deleteEvent).toHaveBeenCalledWith("invalid-id");
  });
});
