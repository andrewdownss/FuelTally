import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Building this site
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Site is under construction. Check back soon!
      </p>
      <Button onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}>
        Sign in
      </Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
}
