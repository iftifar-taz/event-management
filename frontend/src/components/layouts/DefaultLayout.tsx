import { FC, ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "../Header";
import AppSidebar from "../AppSidebar";
import Footer from "../Footer";

const DefaultLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative flex flex-1 flex-col min-h-screen overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default DefaultLayout;
