import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { UserAccountNav } from "./UserAccountNav";
import { cn } from "@/lib/utils";
import DarkModeSwitch from "./DarkModeSwitch";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 inset-x-0 h-fit dark:bg-black bg-zinc-100 light:text-black dark:text-white border-b border-zinc-600 border-opacity-60 z-[10] py-3">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center ">
          <Icons.tempLogo className="dark:bg-white rounded-3xl h-8 w-8 dark:shadow-lg dark:shadow-slate-200" />
          <p className="hidden light:text-zinc-700 text-inherit text-sm font-medium md:block">
            Piel Bonita
          </p>
        </Link>
        <DarkModeSwitch />

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants(),
              "rounded-[2vh] dark:bg-white dark:text-black"
            )}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
