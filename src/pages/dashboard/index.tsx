import AuthCheck from "@/components/auth/AuthCheck";
import DashboardCard from "@/components/car/DashboardCard";
import Header from "@/components/ui/Header";
import NavBar from "@/components/ui/NavBar";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  const getAllCars = api.car.getAllCars.useQuery();
  const data = getAllCars.data;
  return (
    <AuthCheck>
      <NavBar />
      <div className="m-3 md:m-12">
        <Header />
        <div className="mt-4 flex flex-row justify-between">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            My Vehicles
          </h4>
          <Link href="/cars/add">
            <Button>Add Car</Button>
          </Link>
        </div>
        <div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data
              ? data.map((car) => (
                  <DashboardCard key={car.id} carObject={car} />
                ))
              : null}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}
