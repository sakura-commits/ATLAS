
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function TruckDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const truck = await prisma.truck.findUnique({
    where: { id },
  });

  if (!truck) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/trucks"
          className="text-blue-700 hover:underline"
        >
          ← Back to Trucks
        </Link>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Truck {truck.truckNumber}
          </h1>

          <p className="mt-2 text-blue-700">
            {truck.fleet} Fleet
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Detail
              label="Truck Number"
              value={truck.truckNumber}
            />
            <Detail
              label="Fleet"
              value={truck.fleet}
            />
            <Detail
              label="Trailer Number"
              value={truck.trailerNumber ?? "Not assigned"}
            />
            <Detail
              label="Current Mileage"
              value={
                truck.currentMileageKm === null
                  ? "Not recorded"
                  : `${truck.currentMileageKm.toLocaleString()} km`
              }
            />
            <Detail
              label="Has Container"
              value={truck.hasContainer ? "Yes" : "No"}
            />
            <Detail
              label="Status"
              value={truck.operationalStatus ?? "Not recorded"}
            />
          </div>
        </div>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Maintenance History
          </h2>

          <p className="mt-3 text-gray-600">
            Maintenance records for this truck will
            appear here when we build the maintenance
            module.
          </p>
        </section>
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}
