/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MVsnVcXzqyT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ServiceHistoryContainer() {
  return (
    <Card className="grid w-full max-w-md gap-6 p-6">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Service History</div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <Separator />
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Oil Change</div>
            <div className="text-sm text-muted-foreground">June 15, 2023</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Replaced engine oil and filter. Checked all fluid levels.
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Acme Auto Repair
            </div>
            <div className="text-sm font-medium">$49.99</div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Brake Replacement</div>
            <div className="text-sm text-muted-foreground">March 20, 2023</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Replaced front and rear brake pads and rotors.
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Brakes R Us</div>
            <div className="text-sm font-medium">$299.99</div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Next Service Due</div>
            <div className="text-sm text-muted-foreground">
              September 15, 2023
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Recommended Maintenance Schedule:
          </div>
          <div className="text-sm text-muted-foreground">
            - Oil change every 6 months or 5,000 miles
            <br />- Brake inspection every 12 months or 12,000 miles
            <br />- Tire rotation every 6 months or 5,000 miles
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Service Notes</div>
          </div>
          <div className="text-sm text-muted-foreground">
            No issues found. Vehicle is running smoothly.
          </div>
        </div>
      </div>
    </Card>
  );
}
