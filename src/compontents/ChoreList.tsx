import { Chore } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../@/components/ui/card";
import { addDays, intervalToDuration } from "date-fns";
import { Progress } from "../../@/components/ui/progress";

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
  const deadline = addDays(chore.lastCompletedAt, chore.intervalDays);
  const timeUntilDeadline = intervalToDuration({
    start: new Date(),
    end: deadline,
  });
  const daysUntilDeadline = timeUntilDeadline.days ?? 0;
  const progressValue = 100 - (daysUntilDeadline / chore.intervalDays) * 100;

  return (
    <Card className="cursor-pointer ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
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
      </CardContent>
      <CardFooter>
        <Progress value={progressValue} />
      </CardFooter>
    </Card>
  );
};
