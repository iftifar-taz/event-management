import React, { ReactNode } from "react";

const AuthLayout: React.FC<{
  children: ReactNode;
  header: string;
}> = ({ children, header }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col justify-center p-6">
      <div className="flex flex-col items-center">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="h-10"
        />
        <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{header}</div>
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
    </main>
  );
};

export default AuthLayout;
