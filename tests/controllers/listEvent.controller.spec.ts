import { EventController } from "../../src/controllers/eventController";
import { EventService } from "../../src/services/eventService";

describe("EventController - listEvent", () => {
  let controller: EventController;
  let service: jest.Mocked<EventService>;

  beforeEach(() => {
    service = {
      listEvent: jest.fn(),
    } as any;

    controller = new EventController(service);
  });

  it("should return empty array when no events exist", () => {
    service.listEvent.mockReturnValue({
      ok: true,
      message: "List successfully events",
      data: [],
    });

    const result = controller.listEvent();

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.data).toEqual([]);
  });

  it("should return events when they exist", () => {
    service.listEvent.mockReturnValue({
      ok: true,
      message: "List successfully events",
      data: [
        {
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
        },
      ],
    });

    const result = controller.listEvent();

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.data).toHaveLength(1);

    const [firstEvent] = result.data ?? [];

    expect(firstEvent).toBeDefined();
    expect(firstEvent!.name).toBe("Tech Conference");
  });
});
