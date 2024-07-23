/**
 * v0 by Vercel.
 * @see https://v0.dev/t/L4bCLycazPr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/Car";
import Link from "next/link";
import { api } from "@/utils/api";

export default function DashboardCard({ carObject }: { carObject: Car }) {
  const cars = api.car.getAllCars.useQuery();
  const removeCar = api.car.deleteCar.useMutation({
    onSuccess: () => {
      cars.refetch();
    },
  });
  return (
    <Card className="mx-auto grid w-full gap-4 p-4 md:mx-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <h3 className="text-xl font-semibold">
              {carObject.year} {carObject.make} {carObject.model}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <p className="text-sm font-medium">Mileage</p>
            <p className="text-2xl font-semibold">
              {carObject.miles.toLocaleString()}
            </p>
          </div>
          <GaugeIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <p className="text-sm font-medium">VIN</p>
            <p className="text-lg font-semibold">{carObject.vin}</p>
          </div>
          <BarcodeIcon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2">
        <Link href={`/dashboard/${carObject.id}`}>
          <Button variant="outline" className="flex-1">
            View Vehicle
          </Button>
        </Link>
        <Link href={`/service-history/create?carId=${carObject.id}`}>
          <Button className="flex-1">Add Service</Button>
        </Link>
        <Button
          variant={"ghost"}
          onClick={() => {
            removeCar.mutate(carObject.id);
          }}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}

function BarcodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5v14" />
      <path d="M8 5v14" />
      <path d="M12 5v14" />
      <path d="M17 5v14" />
      <path d="M21 5v14" />
    </svg>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function GaugeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
