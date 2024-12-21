import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect, useState } from "react";
import * as AuthApi from "@/api/auth";
import { User } from "@/models/User";

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await AuthApi.getCurrentUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <DefaultLayout>
      <div>Dashboard</div>
      <div>{loggedInUser?.email}</div>
    </DefaultLayout>
  );
};

export default Dashboard;
