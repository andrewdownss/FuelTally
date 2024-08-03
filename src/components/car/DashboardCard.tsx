import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Car } from "@/types/Car";

import { api } from "@/utils/api";

export default function DashboardCard({ carObject }: { carObject: Car }) {
  const cars = api.car.getAllCars.useQuery();
  const removeCar = api.car.deleteCar.useMutation({
    onSuccess: () => {
      cars.refetch().catch((error: Error) => {
        console.error(error);
      });
    },
  });
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {carObject.year} {carObject.make} {carObject.model}
        </CardTitle>
        <CardDescription>Vehicle Information</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="text-muted-foreground">Make:</div>
          <div>{carObject.make}</div>
          <div className="text-muted-foreground">Model:</div>
          <div>{carObject.model}</div>
          <div className="text-muted-foreground">Year:</div>
          <div>{carObject.year}</div>
          <div className="text-muted-foreground">Mileage:</div>
          <div>{carObject.miles.toLocaleString()} mi</div>
          <div className="text-muted-foreground">VIN:</div>
          <div>{carObject.vin}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={`/dashboard/${carObject.id}`}>
          <Button variant="outline">View</Button>
        </Link>
        <Button
          variant="destructive"
          onClick={() => {
            removeCar.mutateAsync(carObject.id).catch(console.error);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
