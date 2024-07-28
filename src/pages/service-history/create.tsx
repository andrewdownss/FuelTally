import React from "react";
import ServiceHistoryForm from "@/components/ServiceHistory/ServiceHistoryForm";
import NavBar from "@/components/ui/NavBar";
import { useRouter } from "next/router";

export default function CreateService() {
  const router = useRouter();
  const { carId } = router.query;

  if (!carId) {
    return <div>Loading...</div>;
  }
  if (carId)
    return (
      <div>
        <NavBar />
        <div className="mt-12 flex justify-center">
          <ServiceHistoryForm car_id={carId as string} />
        </div>
      </div>
    );
}
