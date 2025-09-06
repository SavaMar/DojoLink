import { getDojoData } from "@/data/dojos";
import { DashboardOverview } from "@/components/DashboardOverview";

interface DojoPageProps {
  params: {
    locale: string;
    dojo: string;
  };
}

export default async function DojoPage({ params }: DojoPageProps) {
  const dojo = await getDojoData(params.dojo);

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
