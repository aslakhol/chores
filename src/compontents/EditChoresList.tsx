import type { Chore } from "@prisma/client";
import Link from "next/link";

type Props = { chores: Chore[] };

export const EditChoresList = ({ chores }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {chores.map((c) => (
        <Link key={c.id} href={`${c.id}/edit`} className="hover:underline">
          {c.name}
        </Link>
      ))}
    </div>
  );
};
