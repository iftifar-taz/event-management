import { EventResponse } from "@/interfaces/event.interfaces";
import { http } from "./base";

export const getEvents = async (): Promise<EventResponse[]> => {
  const result = await http.get<EventResponse[]>("/events");
  return result.data;
};
