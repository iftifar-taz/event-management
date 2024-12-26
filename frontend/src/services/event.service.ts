import { EventResponse } from "@/interfaces/event.interfaces";
import { http } from "./base";
import { EventForm } from "@/lib/types";

export const getEvents = async (): Promise<EventResponse[]> => {
  const result = await http.get<EventResponse[]>("/events");
  return result.data;
};

export const getEvent = async (id: string): Promise<EventResponse> => {
  const result = await http.get<EventResponse>(`/events/${id}`);
  return result.data;
};

export const createEvent = async (data: EventForm): Promise<EventResponse> => {
  const result = await http.post<EventResponse>(`/events`, data);
  return result.data;
};

export const updateEvent = async (
  id: string,
  data: EventForm
): Promise<EventResponse> => {
  const result = await http.patch<EventResponse>(`/events/${id}`, data);
  return result.data;
};
