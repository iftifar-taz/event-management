import { UserResponse } from "@/interfaces/user.interfaces";
import { SidebarTrigger } from "./ui/sidebar";

interface HeaderProps {
  user: UserResponse | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-between pr-4 py-4 shadow-2 md:pr-6 2xl:pr-11">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="hidden text-right lg:block">
              <div className="block text-sm font-medium text-black">
                {user?.name}
              </div>
              <div className="block text-xs">{user?.email}</div>
            </div>
            <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center font-bold text-4xl text-gray-600">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
