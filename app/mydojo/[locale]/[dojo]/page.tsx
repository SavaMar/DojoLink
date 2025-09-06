import { getDojoData } from "@/data/dojos";
import { DashboardOverview } from "@/components/DashboardOverview";

interface DojoPageProps {
  params: Promise<{
    locale: string;
    dojo: string;
  }>;
}

export default async function DojoPage({ params }: DojoPageProps) {
  const resolvedParams = await params;
  const dojo = await getDojoData(resolvedParams.dojo);

  if (!dojo) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Dojo Not Found
          </h1>
          <p className="text-gray-600">
            The requested dojo space could not be found.
          </p>
        </div>
      </div>
    );
  }

  return <DashboardOverview dojo={dojo} />;
}
