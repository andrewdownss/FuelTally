import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Component() {
  const router = useRouter();
  const { carId } = router.query;

  const [filterText, setFilterText] = useState("");
  const serviceHistoryEndpoint = api.service.getAllServices.useQuery(
    carId as string,
  );
  const vehicle = api.car.getCar.useQuery(carId as string);
  const vehicleData = vehicle.data;
  const serviceHistory = serviceHistoryEndpoint.data;
  const deleteService = api.service.deleteService.useMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteService.mutateAsync(id, {
        onSuccess: () => {
          serviceHistoryEndpoint.refetch().catch(console.error);
        },
      });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Link href={`/dashboard/${carId as string}`}>
        <Button>Back to vehicle</Button>
      </Link>

      <div className="rounded-lg bg-background p-6 shadow-md md:p-8">
        <div className="mb-6 flex flex-col items-center justify-between md:mb-8 md:flex-row">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Service History
            </h1>
            <p className="text-muted-foreground">
              {vehicleData?.year} {vehicleData?.make} {vehicleData?.model}
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col items-center md:mt-0 md:w-auto md:flex-row">
          <Input
            type="text"
            placeholder="Filter records..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="mr-4 w-full rounded-md border border-input px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary md:w-auto"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceHistory?.map((record, index) => (
            <Card
              key={index}
              className="rounded-lg bg-card p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {record.service_type.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {record.service_type}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {record.service_type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => {
                      handleDelete(record.id).catch(console.error);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-muted/50"
                  ></Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Mileage
                  </p>
                  <p className="text-card-foreground">{record.odometer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Notes
                  </p>
                  <p className="text-card-foreground">
                    {record.service_details}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Price
                  </p>
                  <p className="text-card-foreground">
                    ${record.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Auto shop / Supplier
                  </p>
                  <p className="text-card-foreground">{record.supplier}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Miles
                  </p>
                  <p className="text-card-foreground">{record.odometer}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
