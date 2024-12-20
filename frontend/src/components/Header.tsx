import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-between pr-4 py-4 shadow-2 md:pr-6 2xl:pr-11">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="hidden text-right lg:block">
              <div className="block text-sm font-medium text-black">
                Thomas Anree
              </div>
              <div className="block text-xs">role 1, role 2</div>
            </div>
            <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center font-bold text-4xl text-gray-600">
              T
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
