import { create } from "zustand";
import { EventResponse } from "@/interfaces/event.interfaces";

export interface EventsStore {
  events: EventResponse[];
  setEvents: (events: EventResponse[]) => void;
  updateEvent: (updatedEvent: EventResponse) => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: [],
  setEvents: (events: EventResponse[]) => set({ events }),
  updateEvent: (updatedEvent: EventResponse) =>
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      return { events: updatedEvents };
    }),
}));
