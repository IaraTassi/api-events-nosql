import request from "supertest";
import { createEvent } from "../../../src/domain/createEvent";
import { createApp } from "../../../src/app";

describe("Event Routes", () => {
  let app: any;

  beforeEach(() => {
    ({ app } = createApp());
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
    });

    it("should return 400 when creation fails", async () => {
      const response = await request(app).post("/events").send({});

      expect(response.status).toBe(400);
      expect(response.body.ok).toBe(false);
    });
  });

  describe("POST /events/:id/participants", () => {
    it("should add a participant to an event", async () => {
      const event = createEvent({
        name: "Tech Conference",
        description: "Event about technology",
        location: "São Paulo",
        eventDate: new Date("2030-01-01"),
      });

      const createResponse = await request(app).post("/events").send(event);
      const eventId = createResponse.body.data.id;

      const participant = {
        name: "Carolina",
        email: "carolina@example.com",
      };

      const response = await request(app)
        .post(`/events/${eventId}/participants`)
        .send(participant);

      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
      expect(response.body.data.participants.length).toBe(1);
    });

    it("should return 400 if event does not exist", async () => {
      const response = await request(app)
        .post("/events/invalid-id/participants")
        .send({
          name: "Ana",
          email: "ana@example.com",
        });

      expect(response.status).toBe(400);
      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe("Event not found");
    });
  });

  describe("GET /events", () => {
    it("should list events", async () => {
      const event = createEvent({
        name: "Tech Conference",
        description: "Event about technology",
        location: "São Paulo",
        eventDate: new Date("2030-01-01"),
      });

      await request(app).post("/events").send(event);

      const response = await request(app).get("/events");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe("Tech Conference");
    });

    it("should return empty array when no events exist", async () => {
      const response = await request(app).get("/events");

      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
      expect(response.body.data).toHaveLength(0);
      expect(response.body.data).toEqual([]);
    });
  });
});
