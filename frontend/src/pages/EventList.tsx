import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/services/event.service";
import { useEventsStore } from "@/store/eventsStore";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventList = () => {
  const { events, setEvents } = useEventsStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEventsNow() {
      try {
        const result = await getEvents();
        if (result.length > 0) {
          setEvents(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getEventsNow();
  }, [setEvents]);

  function onCreateClick() {
    navigate("/events/create");
  }

  return (
    <AppLayout>
      <div>Event List</div>
      <Button onClick={onCreateClick}>Create Event</Button>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <div>
              <Link
                to={"/events/" + event.id}
                className="font-semibold text-indigo-600 hover:text-indigo-500 pl-1"
              >
                {event.name}
              </Link>
            </div>
          </div>
        );
      })}
    </AppLayout>
  );
};

export default EventList;
