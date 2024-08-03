import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Car } from "@/types/Car";
import { api } from "@/utils/api";

export default function ServiceHistoryDashboard({ car }: { car: Car }) {
  const serviceHistory = api.service.getAllServices.useQuery(car.id);
  const serviceData = serviceHistory.data;
  return (
    <Card className="md:w-96">
      <CardHeader className="flex justify-between">
        <CardTitle>Service History</CardTitle>
        <div className="flex space-x-2">
          <Link href={`/service-history?carId=${car.id}`}>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
          <Link href={`/service-history/create?carId=${car.id}`}>
            <Button variant="outline" size="sm">
              Add Service
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {serviceData?.length === 0 ? (
            <p>No service history</p>
          ) : (
            serviceData?.map((service) => (
              <div key={service.id}>
                <p className="font-semibold">{service.service_type}</p>
                <p className="text-sm text-muted-foreground">
                  {service.date_created.toLocaleDateString()}
                </p>
                <p className="text-sm">{service.service_details}</p>
                <p className="text-sm">{service.supplier}</p>
                <p className="font-bold">${service.price.toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
