/* eslint-disable @typescript-eslint/no-misused-promises */
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";
import { choreDataSchema } from "../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "../../@/components/ui/form";
import { Input } from "../../@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import { CalendarIcon, Divide } from "lucide-react";
import { Calendar } from "../../@/components/ui/calendar";
import { cn } from "../../@/lib/utils";
import { format } from "date-fns";
import { api } from "../utils/api";

export const NewChoreForm = () => {
  const form = useForm<z.infer<typeof choreDataSchema>>({
    resolver: zodResolver(choreDataSchema),
    defaultValues: {
      name: "",
      intervalDays: 7,
      lastCompletedAt: new Date(),
    },
  });
  const createChoreMutation = api.chore.create.useMutation();

  const onSubmit: SubmitHandler<z.infer<typeof choreDataSchema>> = (values) => {
    console.log(values);
    createChoreMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chore name</FormLabel>
              <FormControl>
                <Input placeholder="Name of chore" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intervalDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chore interval (days)</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastCompletedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last chore completion</FormLabel>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                When was the last time this chore was completed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
