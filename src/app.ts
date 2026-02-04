import express from "express";
import { InMemoryEventRepository } from "./repositories/inMemoryEventRepository";
import { EventService } from "./services/eventService";
import { EventController } from "./controllers/eventController";
import { eventRoutes } from "./routes/event.routes";

export function createApp() {
  const app = express();
  app.use(express.json());

  const repository = new InMemoryEventRepository();
  const service = new EventService(repository);
  const controller = new EventController(service);

  eventRoutes(app, controller);

  return { app, repository };
}
