import AuthCheck from "@/components/auth/AuthCheck";
import DashboardCard from "@/components/car/DashboardCard";
import Header from "@/components/ui/Header";
import NavBar from "@/components/ui/NavBar";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/Car";
import { api } from "@/utils/api";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  const getAllCars = api.car.getAllCars.useQuery();
  const data = getAllCars.data;
  return (
    <AuthCheck>
      <NavBar />
      <div className="m-4">
        <Header />
        <div className="container mx-auto py-8">
          <div className="my-4 mt-4">
            <Link href="/car/create">
              <Button>Add a car</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((car) => (
              <DashboardCard key={car.id} carObject={car as Car} />
            ))}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}
