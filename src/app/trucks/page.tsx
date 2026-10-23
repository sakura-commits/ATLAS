
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { registerTruck } from "./actions";

export const runtime = "nodejs";

export default async function TrucksPage() {
  const trucks = await prisma.truck.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-blue-700">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Truck Management
        </h1>

        <p className="mt-2 text-gray-600">
          Register and manage IMARA and FASTER trucks.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Register a Truck
            </h2>

            <form action={registerTruck} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="truckNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Truck Number *
                </label>
                <input
                  id="truckNumber"
                  name="truckNumber"
                  required
                  maxLength={40}
                  placeholder="e.g. 180ERL"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="fleet"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fleet *
                </label>
                <select
                  id="fleet"
                  name="fleet"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                >
                  <option value="IMARA">IMARA</option>
                  <option value="FASTER">FASTER</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="trailerNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Trailer Number
                </label>
                <input
                  id="trailerNumber"
                  name="trailerNumber"
                  maxLength={40}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="currentMileageKm"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Mileage (km)
                </label>
                <input
                  id="currentMileageKm"
                  name="currentMileageKm"
                  type="number"
                  min="0"
                  step="1"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                />
              </div>

              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" name="hasContainer" />
                Truck currently has a container
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Register Truck
              </button>
            </form>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Registered Trucks ({trucks.length})
            </h2>

            <div className="mt-5 space-y-3">
              {trucks.length === 0 ? (
                <p className="text-gray-500">
                  No trucks registered yet.
                </p>
              ) : (
                trucks.map((truck) => (
                  <div
                    key={truck.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex justify-between gap-3">
                    <Link
  href={`/trucks/${truck.id}`}
  className="font-bold text-blue-700 hover:underline"
>
  {truck.truckNumber}
</Link>
                      <span className="text-sm text-blue-700">
                        {truck.fleet}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">
                      Trailer: {truck.trailerNumber || "Not assigned"}
                    </p>

                    <p className="text-sm text-gray-600">
                      Mileage:{" "}
                      {truck.currentMileageKm === null
                        ? "Not recorded"
                        : `${truck.currentMileageKm.toLocaleString()} km`}
                    </p>

                    <p className="text-sm text-gray-600">
                      Container: {truck.hasContainer ? "Yes" : "No"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
