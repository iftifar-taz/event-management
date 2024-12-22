import AppLayout from "@/components/layouts/AppLayout";
import { getEvents } from "@/services/event.service";
import { useEventsStore } from "@/store/eventsStore";
import { useEffect } from "react";

const EventList = () => {
  const { events, setEvents } = useEventsStore();

  useEffect(() => {
    async function logoutNow() {
      try {
        const result = await getEvents();
        if (result.length > 0) {
          setEvents(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    logoutNow();
  }, [setEvents]);

  return (
    <AppLayout>
      <div>EventList</div>
      {events.map((event) => {
        return <div key={event.id}>{event.name}</div>;
      })}
    </AppLayout>
  );
};

export default EventList;
