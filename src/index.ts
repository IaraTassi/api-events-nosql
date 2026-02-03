import express, { Request, Response } from "express";
import { InMemoryEventRepository } from "./repositories/inMemoryEventRepository";
import { EventService } from "./services/eventService";
import { EventController } from "./controllers/eventController";

const app = express();
app.use(express.json());

const repository = new InMemoryEventRepository();
const service = new EventService(repository);
const controller = new EventController(service);

app.post("/events", (req: Request, res: Response) => {
  try {
    const result = controller.createEvent(req.body);
    if (result.ok) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`🚀 O servidor está executando na porta 3000`);
});
