/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SYHrtJptHtF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Component() {
  const router = useRouter();
  const { carId } = router.query;
  const [sortColumn, setSortColumn] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
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
          serviceHistoryEndpoint.refetch();
        },
      });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const sortedHistory = useMemo(() => {
    if (!serviceHistory) return []; // Add null check for serviceHistory
    return serviceHistory.sort((a, b) => {
      if ((a as any)[sortColumn] < (b as any)[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if ((a as any)[sortColumn] > (b as any)[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [serviceHistory, sortColumn, sortDirection]);

  const filteredHistory = useMemo(() => {
    return sortedHistory.filter((record) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase()),
      ),
    );
  }, [sortedHistory, filterText]);
  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Link href={`/dashboard/${carId}`}>
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
          <div className="mt-4 flex w-full flex-col items-center md:mt-0 md:w-auto md:flex-row">
            <Input
              type="text"
              placeholder="Filter records..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="mr-4 w-full rounded-md border border-input px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary md:w-auto"
            />
            <div className="mt-4 flex items-center space-x-2 md:mt-0 md:space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => handleSort("date")}
              >
                <ArrowUpIcon
                  className={`mr-2 h-4 w-4 ${
                    sortColumn === "date"
                      ? `transform ${sortDirection === "asc" ? "rotate-180" : ""}`
                      : ""
                  }`}
                />
                Date
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => handleSort("mileage")}
              >
                <ArrowUpIcon
                  className={`mr-2 h-4 w-4 ${
                    sortColumn === "mileage"
                      ? `transform ${sortDirection === "asc" ? "rotate-180" : ""}`
                      : ""
                  }`}
                />
                Mileage
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => handleSort("type")}
              >
                <ArrowUpIcon
                  className={`mr-2 h-4 w-4 ${
                    sortColumn === "type"
                      ? `transform ${sortDirection === "asc" ? "rotate-180" : ""}`
                      : ""
                  }`}
                />
                Type
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHistory.map((record, index) => (
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
                      handleDelete(record.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-muted/50"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
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

function ArrowUpIcon(props: any) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function PencilIcon(props: any) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
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
