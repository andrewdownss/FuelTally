/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CD7qPxPufxs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CarData {
  make: { name: string };
  model: { name: string };
  years: { year: string }[];
  categories: { epaClass: string };
  engine: { cylinder: string; fuelType: string };
  drivenWheels: string;
  transmission: string;
  mpg: { city: string; highway: string };
}

const AddCarForm = () => {
  const [vin, setVin] = useState("");
  const [miles, setMiles] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKamFja3BvcHVAZ21haWwuY29t`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch car data");
      }
      const data: CarData = (await response.json()) as CarData;
      const car = {
        make: data.make.name,
        model: data.model.name,
        year: parseInt(data.years[0]?.year ?? "0"),
        vin: vin,
        epaClass: data.categories.epaClass,
        cylinders: parseInt(data.engine.cylinder),
        fuelType: data.engine.fuelType,
        drivenWheels: data.drivenWheels,
        transmission: data.transmission,
        cityMpg: parseInt(data.mpg.city),
        highwayMpg: parseInt(data.mpg.highway),
      };

      console.log(car);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form elements here */}
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Add a Car</CardTitle>
          <CardDescription>
            Choose how you would like to add a new car to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="vin">Vehicle Identification Number (VIN)</Label>
                <Input
                  id="vin"
                  onChange={(e) => setVin(e.target.value)}
                  value={vin}
                  placeholder="Enter VIN"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="miles">Miles</Label>
                <Input
                  id="miles"
                  type="number"
                  min={0}
                  placeholder="Enter miles"
                  onChange={(e) => setMiles(parseInt(e.target.value))}
                  value={miles}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Add Car
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddCarForm;
