import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroImage from "@/public/hero-image.png";
export default function Home() {
  return (
    <div className="mx-10 mt-12 text-center md:mx-0">
      <div className="mx-auto md:w-1/2">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          A tool built for vehicle maintenance
        </h1>
        <Image
          className={"mx-auto"}
          src={"/hero-image.png"}
          alt="Car"
          width={500}
          height={500}
        />
        <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
          This is a tool to help you keep track of your vehicle&apos;s
          maintenance history. You can add services, view all services, and ask
          AI about your vehicle.
        </p>

        <Button
          className="mt-4"
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
        >
          Get Started
        </Button>
      </div>
      <section className="mt-12 w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get rid of pencil and paper, and use our tool anywhere
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is designed to help you keep track of your vehicle
                maintenance history with ease. You can add services, view all
                services, and ask AI about your vehicle.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="grid gap-4 rounded-lg bg-card p-6 shadow-md">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Track multiple vehicles</h3>
                <p className="text-muted-foreground">
                  Keep track of all your vehicles in one place. Ditch multiple
                  notebooks and store your service history in one spot.
                </p>
              </div>
            </div>
            <div className="grid gap-4 rounded-lg bg-card p-6 shadow-md">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">
                  Run your vin to grab your vehicles information
                </h3>
                <p className="text-muted-foreground">
                  No need to type in all your vehicles information. Just run
                  your vin and we will grab all the information for you.
                </p>
              </div>
            </div>
            <div className="grid gap-4 rounded-lg bg-card p-6 shadow-md">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Ask AI</h3>
                <p className="text-muted-foreground">
                  Ask AI about your vehicle and get the information you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
