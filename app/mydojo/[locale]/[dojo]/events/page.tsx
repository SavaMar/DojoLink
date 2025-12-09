import { getDojoData } from "@/data/dojos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventsPageProps {
  params: Promise<{
    locale: string;
    dojo: string;
  }>;
}

const mockEvents = [
  {
    id: "1",
    name: "Weekly Training Session",
    description: "Brazilian JiuJitsu training for all levels",
    date: "2024-12-22",
    timeFrom: "19:00",
    timeTo: "21:00",
    maxParticipants: 20,
    currentParticipants: 15,
    price: 25,
    status: "published" as const,
  },
  {
    id: "2",
    name: "Belt Promotion Ceremony",
    description: "Monthly belt testing and promotion ceremony",
    date: "2024-12-28",
    timeFrom: "18:00",
    timeTo: "20:00",
    maxParticipants: 50,
    currentParticipants: 32,
    price: 0,
    status: "published" as const,
  },
  {
    id: "3",
    name: "New Year Seminar",
    description: "Special seminar with guest instructor",
    date: "2025-01-05",
    timeFrom: "10:00",
    timeTo: "16:00",
    maxParticipants: 30,
    currentParticipants: 8,
    price: 80,
    status: "draft" as const,
  },
];

export default async function EventsPage({ params }: EventsPageProps) {
  const resolvedParams = await params;
  const dojo = await getDojoData(resolvedParams.dojo);

  if (!dojo) {
    return <div>Dojo not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            Events
          </h1>
          <p className="mt-1" style={{ color: "rgb(180, 180, 180)" }}>
            Manage your dojo events and training sessions
          </p>
        </div>
        <Button style={{ backgroundColor: "rgb(3, 126, 168)" }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <Card
            key={event.id}
            className="hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "rgb(42, 46, 49)",
            }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle
                  className="text-lg"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  {event.name}
                </CardTitle>
                <Badge
                  variant={
                    event.status === "published" ? "default" : "secondary"
                  }
                  style={{
                    backgroundColor:
                      event.status === "published"
                        ? "rgb(3, 126, 168)"
                        : "rgb(63, 67, 70)",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  {event.status}
                </Badge>
              </div>
              <p className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
                {event.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="flex items-center text-sm"
                style={{ color: "rgb(180, 180, 180)" }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div
                className="flex items-center text-sm"
                style={{ color: "rgb(180, 180, 180)" }}
              >
                <Clock className="w-4 h-4 mr-2" />
                {event.timeFrom} - {event.timeTo}
              </div>
              <div
                className="flex items-center text-sm"
                style={{ color: "rgb(180, 180, 180)" }}
              >
                <Users className="w-4 h-4 mr-2" />
                {event.currentParticipants}/{event.maxParticipants} participants
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-semibold"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  {event.price === 0 ? "Free" : `CHF ${event.price}`}
                </span>
                <div
                  className="w-full rounded-full h-2 ml-4"
                  style={{ backgroundColor: "rgb(63, 67, 70)" }}
                >
                  <div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: "rgb(3, 126, 168)",
                      width: `${
                        (event.currentParticipants / event.maxParticipants) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
