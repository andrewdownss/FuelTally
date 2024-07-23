//create the authCheck component to check if the user is authenticated or not

import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthCheck = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return children;
};

export default AuthCheck;
