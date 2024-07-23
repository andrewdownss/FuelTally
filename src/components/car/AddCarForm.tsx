/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CD7qPxPufxs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function AddCarForm() {
  const [addMethod, setAddMethod] = useState("vin");
  const router = useRouter();
  const [vin, setVin] = useState("");
  const [miles, setMiles] = useState(0);
  const addCar = api.car.addCar.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      alert("Error adding car: " + error.message);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addMethod === "vin") {
      try {
        const response = await fetch(
          `https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKamFja3BvcHVAZ21haWwuY29t`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        const car = {
          make: data.make.name,
          model: data.model.name,
          year: parseInt(data.years[0].year),
          vin: vin,
          epaClass: data.categories.epaClass,
          cylinders: parseInt(data.engine.cylinder),
          fuelType: data.engine.fuelType,
          horsePower: parseInt(data.engine.horsepower),
          torque: parseInt(data.engine.torque),
          driveType: data.drivenWheels,
          transmission: data.transmission.automaticType,
          fuelCity: parseInt(data.mpg.city),
          fuelHighway: parseInt(data.mpg.highway),
          miles: miles,
        };

        addCar.mutate(car);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Add a Car</CardTitle>
          <CardDescription>
            Choose how you'd like to add a new car to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <RadioGroup
              value={addMethod}
              onValueChange={setAddMethod}
              className="grid grid-cols-2 gap-2"
            >
              <Label
                htmlFor="add-by-vin"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-md border p-4 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="add-by-vin" value="vin" />
                Add by VIN
              </Label>
              <Label
                htmlFor="add-manually"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-md border p-4 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="add-manually" value="manual" />
                Add Manually
              </Label>
            </RadioGroup>
            {addMethod === "vin" ? (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="vin">
                    Vehicle Identification Number (VIN)
                  </Label>
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
            ) : (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="Enter make" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="Enter model" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" placeholder="Enter year" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" placeholder="Enter color" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="miles">Miles</Label>
                  <Input
                    id="miles"
                    type="number"
                    placeholder="Enter miles"
                    onChange={(e) => setMiles(parseInt(e.target.value))}
                    value={miles}
                  />
                </div>
              </div>
            )}
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
}
