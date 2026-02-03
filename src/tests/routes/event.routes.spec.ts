import request from "supertest";
import express, { Express } from "express";
import { EventController } from "../controllers/eventController";
import { EventService } from "../services/eventService";
import { InMemoryEventRepository } from "../repositories/inMemoryEventRepository";
import { createEvent } from "../domain/createEvent";

let app: Express;

beforeEach(() => {
  app = express();
  app.use(express.json());

  const repository = new InMemoryEventRepository();
  const service = new EventService(repository);
  const controller = new EventController(service);

  app.post("/events", (req, res) => {
    const result = controller.createEvent(req.body);
    if (result.ok) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  });
});

describe("POST /events", () => {
  it("should create a new event and return 201", async () => {
    const event = createEvent({
      name: "Tech Conference",
      description: "Event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });

    const response = await request(app).post("/events").send(event);

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.data.name).toBe(event.name);
    expect(response.body.data.description).toBe(event.description);
  });

  it("should return 400 if service fails", async () => {
    const repository = new InMemoryEventRepository();
    const service = new EventService(repository);
    jest.spyOn(service, "createEvent").mockReturnValueOnce({
      ok: false,
      message: "Repository failure",
    });
    const controller = new EventController(service);

    const appWithError = express();
    appWithError.use(express.json());
    appWithError.post("/events", (req, res) => {
      const result = controller.createEvent(req.body);
      res.status(result.ok ? 201 : 400).json(result);
    });

    const event = createEvent({
      name: "Tech Conference",
      description: "Event about technology",
      location: "São Paulo",
      eventDate: new Date("2030-01-01"),
    });

    const response = await request(appWithError).post("/events").send(event);

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.message).toBe("Repository failure");
  });
});
