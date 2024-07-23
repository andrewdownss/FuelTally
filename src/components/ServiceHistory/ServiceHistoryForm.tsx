import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
export default function ServiceHistoryForm({ car_id }: { car_id?: string }) {
  const CreateService = api.service.addService.useMutation();
  const router = useRouter();
  const [formState, setFormState] = useState({
    car_id: car_id,
    service_type: "",
    price: 0.0,
    supplier: "",
    odometer: 0,
    service_details: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      ...formState,
      car_id: car_id as string,
    };

    CreateService.mutateAsync(data, {
      onSuccess: () => {
        router.push(`/dashboard/${car_id}`);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>
            Fill out the details for your new service offering.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                onChange={(e) => {
                  setFormState({ ...formState, service_type: e.target.value });
                }}
                value={formState.service_type}
                placeholder="e.g. Oil Change"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                onChange={(e) => {
                  setFormState({ ...formState, price: e.target.valueAsNumber });
                }}
                value={formState.price}
                placeholder="$99.99"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              onChange={(e) => {
                setFormState((prevState) => ({
                  ...prevState,
                  service_details: e.target.value,
                }));
              }}
              value={formState.service_details}
              placeholder="Provide details about the service..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier">Part Supplier / Auto Shop</Label>
            <Input
              id="supplier"
              placeholder="ABC Auto Parts"
              onChange={(e) => {
                setFormState({
                  ...formState,
                  supplier: e.target.value,
                });
              }}
              value={formState.supplier}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="odometer">Odometer( miles )</Label>
            <Input
              id="odometer"
              placeholder="100,000 miles"
              type="number"
              onChange={(e) => {
                setFormState({
                  ...formState,
                  odometer: e.target.valueAsNumber,
                });
              }}
              value={formState.odometer}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Add Service</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
