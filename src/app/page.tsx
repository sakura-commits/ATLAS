
import { prisma } from "@/lib/prisma";
import { ThemeToggle } from "../../components/theme-toggle";

export const runtime = "nodejs";

export default async function Home() {
  const [totalTrucks, imaraTrucks, fasterTrucks] =
    await Promise.all([
      prisma.truck.count(),
      prisma.truck.count({
        where: { fleet: "IMARA" },
      }),
      prisma.truck.count({
        where: { fleet: "FASTER" },
      }),
    ]);

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900 transition-colors dark:bg-[#0B1220] dark:text-slate-100">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Project Atlas
      </h1>
 <div className="mt-4">
  <ThemeToggle />
</div>
      <p className="mt-2 text-gray-600">
        Fleet Maintenance & Operations Management
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <DashboardCard
          title="Total Trucks"
          value={totalTrucks}
        />
        <DashboardCard
          title="IMARA Trucks"
          value={imaraTrucks}
        />
        <DashboardCard
          title="FASTER Trucks"
          value={fasterTrucks}
        />
      </div>

      <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Fleet Management
        </h2>

        <p className="mt-2 text-gray-600">
          Truck registration and maintenance tracking
          will appear here.
        </p>
      </section>
    </main>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}
