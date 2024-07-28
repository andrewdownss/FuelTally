import React from "react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Hello, {sessionData?.user.name ?? "Stranger"}
      </h1>
      {/* <div>
        <ul className="flex flex-row space-x-4">
          <li>
            <Link href="/dashboard">My Vehicles</Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
