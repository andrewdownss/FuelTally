/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qsVD0bHwYyj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function FuelHistoryContainer() {
  return (
    <Card className="grid w-full max-w-md gap-6 p-6">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Fuel History</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              View All
            </Button>
            <Button size="sm">Add Fuel</Button>
          </div>
        </div>
        <Separator />
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Fuel Fill-up</div>
            <div className="text-sm text-muted-foreground">June 20, 2023</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Filled up tank with 12 gallons of premium fuel.
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Acme Gas Station
            </div>
            <div className="text-sm font-medium">$48.00</div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Fuel Fill-up</div>
            <div className="text-sm text-muted-foreground">May 15, 2023</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Filled up tank with 10 gallons of regular fuel.
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Fuel Express</div>
            <div className="text-sm font-medium">$35.00</div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Next Fuel Fill-up</div>
            <div className="text-sm text-muted-foreground">August 1, 2023</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Estimated fuel tank capacity: 15 gallons
            <br />
            Average fuel economy: 25 mpg
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Fuel Notes</div>
          </div>
          <div className="text-sm text-muted-foreground">
            No issues with fuel system. Vehicle is running efficiently.
          </div>
        </div>
      </div>
    </Card>
  );
}
