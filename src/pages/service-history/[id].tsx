import React from "react";
import { api } from "@/utils/api";
import ServiceHistoryTable from "@/components/ServiceHistory/ServiceHistoryTable";
import { Service } from "@/types/Services";
import { useRouter } from "next/router";
export default function ServiceHistoryView() {
  const router = useRouter();
  const { id } = router.query;

  const getService = api.service.getService.useQuery(id as string);
  const service = getService.data;
  if (getService.status === "pending") {
    return <div>Loading...</div>;
  } else if (getService.status === "error") {
    return <div>Error: {getService.error.message}</div>;
  } else if (service) {
    return (
      <p>
        service history for {id} {service.id} {service.service_type}{" "}
      </p>
    );
  }
}
