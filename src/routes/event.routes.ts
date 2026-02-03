import { Application } from "express";
import { EventController } from "../controllers/eventController";

export function eventRoutes(app: Application, controller: EventController) {
  app.post("/events", (req, res) => {
    const result = controller.createEvent(req.body);
    res.status(result.ok ? 201 : 400).json(result);
  });

  app.post("/events/:id/participants", (req, res) => {
    const result = controller.addParticipant(req.params.id, req.body);
    res.status(result.ok ? 200 : 400).json(result);
  });
}
