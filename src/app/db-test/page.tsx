
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function DatabaseTest() {
  const totalTrucks = await prisma.truck.count();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Atlas Database Connection
      </h1>

      <p className="mt-4 text-gray-700">
        Total trucks in database: {totalTrucks}
      </p>

      <p className="mt-2 text-green-700">
        Database query completed successfully.
      </p>
    </main>
  );
}

