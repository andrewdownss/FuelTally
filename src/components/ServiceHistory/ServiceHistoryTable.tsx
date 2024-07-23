/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PE8WGh5erXB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/Services";

export default function ServiceHistoryTable({
  services,
}: {
  services: Service[];
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Car Service History</h1>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <TableRow>
              <TableCell className="font-medium">Oil Change</TableCell>
              <TableCell>$49.99</TableCell>
              <TableCell>Main Street Garage</TableCell>
              <TableCell>June 15, 2024</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell className="font-medium">Brake Inspection</TableCell>
              <TableCell>$89.99</TableCell>
              <TableCell>Acme Auto Repair</TableCell>
              <TableCell>April 20, 2024</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Tire Rotation</TableCell>
              <TableCell>$29.99</TableCell>
              <TableCell>Discount Tire Center</TableCell>
              <TableCell>February 12, 2024</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Engine Tune-up</TableCell>
              <TableCell>$149.99</TableCell>
              <TableCell>Precision Auto Care</TableCell>
              <TableCell>November 30, 2023</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
