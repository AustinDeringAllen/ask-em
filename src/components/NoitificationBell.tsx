import { IoMdNotifications } from "react-icons/io";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function NotificationBell() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative">
            <div className="absolute right-1.5 top-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-[0.5rem] text-white"></div>
            <IoMdNotifications className="h-8 w-8" />
          </div>
        </DropdownMenuTrigger>
        {/* <DropdownMenuContent></DropdownMenuContent> */}
      </DropdownMenu>
    </>
  );
}
