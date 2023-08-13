import { Chore } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../@/components/ui/card";
import { addDays, format, intervalToDuration, isBefore } from "date-fns";
import { Progress } from "../../@/components/ui/progress";
import { cn } from "../../@/lib/utils";

import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { DialogFooter } from "../../@/components/ui/dialog";
import { Button } from "../../@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../@/components/ui/calendar";
import { Label } from "../../@/components/ui/label";
import { api } from "../utils/api";

const dateFormat = {
  day: "numeric",
  month: "short",
  year: "numeric",
} as const;

type Props = { chores: Chore[] };

export const ChoreList = ({ chores }: Props) => {
  return (
    <div className="flex flex-col gap-3 p-8">
      {chores.map((c) => (
        <Chore key={c.id} chore={c} />
      ))}
    </div>
  );
};

type ChoreProps = { chore: Chore };

const Chore = ({ chore }: ChoreProps) => {
  return <ChoreCard chore={chore} />;
};

type ChoreCardProps = { chore: Chore };

const ChoreCard = ({ chore }: ChoreCardProps) => {
  const deadline = addDays(chore.lastCompletedAt, chore.intervalDays);
  const timeUntilDeadline = intervalToDuration({
    start: new Date(),
    end: deadline,
  });
  const daysUntilDeadline = timeUntilDeadline.days ?? 0;
  const progressValue = 100 - (daysUntilDeadline / chore.intervalDays) * 100;

  const deadlineHasPassed = isBefore(deadline, new Date());

  return (
    <Card
      className={cn(
        "cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
        (deadlineHasPassed || progressValue > 90) && "bg-destructive"
      )}
    >
      <CardHeader>
        <CardTitle>{chore.name}</CardTitle>
        <CardDescription>
          Last completed:{" "}
          {chore.lastCompletedAt.toLocaleDateString("en-GB", dateFormat)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Interval (days): {chore.intervalDays}</p>
        <p>Deadline: {deadline.toLocaleDateString("en-GB", dateFormat)} </p>
        <div className="pt-2">
          <Progress value={deadlineHasPassed ? 100 : progressValue} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <ChoreDialog chore={chore} />
      </CardFooter>
    </Card>
  );
};

type ChoreDialogProps = { chore: Chore };

export const ChoreDialog = ({ chore }: ChoreDialogProps) => {
  const [open, setOpen] = useState(false);
  const [completedAt, setCompletedAt] = useState<Date | undefined>(new Date());
  const completeChoreMutation = api.chore.complete.useMutation();

  const utils = api.useContext();

  const completeChore = (who: string) => {
    completeChoreMutation.mutate(
      { choreId: chore.id, completedBy: who, completedAt },
      {
        onSettled: () => {
          void utils.chore.getAll.invalidate();
          setCompletedAt(new Date());
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Complete chore</Button>
      </DialogTrigger>
      <DialogContent className="pt-8 sm:max-w-[425px]">
        <Label className="block pb-1">When was the chore completed</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !completedAt && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {completedAt ? (
                format(completedAt, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={completedAt}
              onSelect={setCompletedAt}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="grid gap-4 py-4"></div>
        <Label className="block pb-1">Who completed the chore</Label>
        <DialogFooter className="flex flex-row justify-between gap-2">
          <Button
            className="flex-grow"
            type="submit"
            onClick={() => completeChore("Madeleine")}
          >
            Madeleine
          </Button>
          <Button
            className="flex-grow"
            type="submit"
            onClick={() => completeChore("Aslak")}
          >
            Aslak
          </Button>
          <Button
            className="flex-grow"
            type="submit"
            onClick={() => completeChore("Both")}
          >
            Both
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
