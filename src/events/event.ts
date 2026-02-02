import { Participants } from "@prisma/client";

export type Event = {
  id: string;
  name: string;
  description: string;
  location: string;
  eventDate: Date;
  isSoldOut: boolean;
  participants: Participants[];
};
