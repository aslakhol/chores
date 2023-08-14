import type { Chore } from "@prisma/client";
import { addDays, intervalToDuration, isBefore } from "date-fns";

export const sortChoresByDescendingProgressValue = (a: Chore, b: Chore) => {
  const { progressValue: aProgressValue } = getChoreProgressValues(a);
  const { progressValue: bProgressValue } = getChoreProgressValues(b);

  return bProgressValue - aProgressValue;
};

export const getChoreProgressValues = (chore: Chore) => {
  const deadline = addDays(chore.lastCompletedAt, chore.intervalDays);
  const timeUntilDeadline = intervalToDuration({
    start: new Date(),
    end: deadline,
  });
  const daysUntilDeadline = timeUntilDeadline.days ?? 0;
  const progressValue = 100 - (daysUntilDeadline / chore.intervalDays) * 100;

  const deadlineHasPassed = isBefore(deadline, new Date());

  return {
    deadline,
    deadlineHasPassed,
    progressValue: deadlineHasPassed ? 100 : progressValue,
  };
};
