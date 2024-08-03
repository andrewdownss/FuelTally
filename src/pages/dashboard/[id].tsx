import { useRouter } from "next/router";

import NavBar from "@/components/ui/NavBar";
import { api } from "@/utils/api";

import ServiceHistoryDashboard from "@/components/ServiceHistory/ServiceHistoryDashboard";
import AskAIContainer from "@/components/AskAI/AskAIContainer";

export default function ViewVehicleByID() {
  const router = useRouter();
  const id = router.query.id;
  const car = api.car.getCar.useQuery(id as string);
  const data = car.data;
  if (!data) return <div>Loading...</div>;
  if (car.error) return <div>Error: {car.error.message}</div>;
  if (data)
    return (
      <div className="bg-secondary">
        <NavBar />
        <div className="mt-12 space-y-6">
          <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
              <div className="mb-4 flex items-center space-x-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {data.make} {data.model}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {data.year} Model
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    VIN
                  </p>
                  <p className="text-md font-bold">{data.vin}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    EPA Class
                  </p>
                  <p className="text-lg font-bold">{data.epaClass}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Cylinders
                  </p>
                  <p className="text-lg font-bold">{data.cylinders}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Fuel Type
                  </p>
                  <p className="text-lg font-bold">{data.fuelType}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
              <div className="flex flex-col">
                <div>
                  <div>
                    <p className="font-medium text-gray-500 dark:text-gray-400">
                      Mileage
                    </p>
                    <p className="text-4xl font-bold">
                      {data.miles.toLocaleString()} miles
                    </p>
                  </div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Horsepower
                  </p>
                  <p className="text-4xl font-bold">{data.horsePower} hp</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Torque
                  </p>
                  <p className="text-4xl font-bold">{data.torque} lb-ft</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Drivetrain
                  </p>
                  <p className="text-lg font-bold">{data.driveType}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Transmission
                  </p>
                  <p className="text-lg font-bold">{data.transmission}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4">
            <ServiceHistoryDashboard car={data} />
            <AskAIContainer />
          </div>
        </div>
      </div>
    );
}
