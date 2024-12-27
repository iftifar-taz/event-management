import AppLayout from "@/components/layouts/AppLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "@/services/event.service";
import { useForm } from "react-hook-form";
import { EventForm } from "@/lib/types";
import { eventForm } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { capitaliseFirstLetter, cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_STATUSES, PAGE_MODE } from "@/lib/consts";
import { createEvent, updateEvent } from "@/services/event.service";
import { AxiosError } from "axios";

export interface EventItemProps {
  mode: string;
}

const EventItem = ({ mode }: EventItemProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<EventForm>({
    resolver: zodResolver(eventForm),
    defaultValues: {
      status: "upcoming",
    },
    mode: "onChange",
  });

  useEffect(() => {
    async function getEventsNow() {
      try {
        const result = await getEvent(id!);
        if (result) {
          form.setValue("name", result.name);
          form.setValue("description", result.description);
          form.setValue("startDate", new Date(result.startDate));
          form.setValue("endDate", new Date(result.endDate));
          form.setValue("registrationFee", result.registrationFee);
          form.setValue("status", result.status);
          await form.trigger();
        }
      } catch (error) {
        console.error(error);
      }
    }

    console.log(id);
    console.log(mode);
    if (mode === PAGE_MODE.update && id) {
      getEventsNow();
    }
  }, [id, mode]);

  const onSubmit = async (data: EventForm) => {
    setLoading(true);
    try {
      const result =
        mode === PAGE_MODE.create
          ? await createEvent(data)
          : await updateEvent(id!, data);
      if (result?.id) {
        setLoading(false);
        navigate("/events");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <main className="flex flex-1 flex-col p-6">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">
            {mode === PAGE_MODE.create ? "Create" : "Edit"} Event
          </div>
          <div className="mt-10">
            <div className="font-bold text-red-600">{error}</div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormMessage />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Name" autoFocus />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("2000-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("2000-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registrationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Fee</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Description"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EVENT_STATUSES.map((x, i) => {
                            return (
                              <SelectItem key={i} value={x}>
                                {capitaliseFirstLetter(x)}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={
                    !form.formState.isDirty ||
                    !form.formState.isValid ||
                    isLoading
                  }
                  type="submit"
                >
                  {isLoading
                    ? "..."
                    : mode === PAGE_MODE.create
                    ? "Create"
                    : "Update"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default EventItem;
