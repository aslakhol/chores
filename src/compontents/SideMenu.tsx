import { Menu } from "lucide-react";
import { buttonVariants } from "../../@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  Sheet,
} from "../../@/components/ui/sheet";
import Link from "next/link";

export const SideMenu = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="py-4" />
            <Link className={buttonVariants({ variant: "outline" })} href="/">
              Chores
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/new"
            >
              Create new chore
            </Link>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
