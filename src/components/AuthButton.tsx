import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import NotificationBell from "./NoitificationBell";

export default function AuthButton() {
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <Button
        onClick={() => signIn()}
        className="bg-white text-black hover:bg-blue-500 hover:text-white"
      >
        Sign In
      </Button>
    );

  return (
    <div className="flex items-center gap-4">
      <NotificationBell />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-full bg-blue-500">
            {sessionData.user.image ? (
              <Image
                src={sessionData.user.image}
                fill
                objectFit="cover"
                alt=""
                className="rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-300">
                {(sessionData.user.name?.match(/[a-zA-Z]/) ?? ["?"])?.pop()}
              </div>
            )}
          </div>
          <p>{sessionData.user.name ?? "User"}</p>
          <p>⬇</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/user/${sessionData.user.id}`}>My Page</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/user/answer`}>Answer Questions</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={() => signOut()}>Sign Out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
