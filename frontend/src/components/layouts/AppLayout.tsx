import { FC, ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "../Header";
import AppSidebar from "../AppSidebar";
import Footer from "../Footer";
import { useAuthStore } from "@/store/authStore";

const AppLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { user } = useAuthStore();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative flex flex-1 flex-col min-h-screen overflow-y-auto overflow-x-hidden">
        <Header user={user} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
