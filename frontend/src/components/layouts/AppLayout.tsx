import { FC, ReactNode, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "../Header";
import AppSidebar from "../AppSidebar";
import Footer from "../Footer";
import { useAuthStore } from "@/store/authStore";
import * as UsersApi from "@/api/users";

const AppLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const currentUser = await UsersApi.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, [setUser]);

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
