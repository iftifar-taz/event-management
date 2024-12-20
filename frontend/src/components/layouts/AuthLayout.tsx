import React, { ReactNode } from "react";

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col justify-center p-6">
      {children}
    </main>
  );
};

export default AuthLayout;
