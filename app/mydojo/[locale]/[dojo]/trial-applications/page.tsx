"use client";

import { getDojoData } from "@/data/dojos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  Award,
  MessageSquare,
  CheckCircle,
  XCircle,
  Edit,
  ExternalLink,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";

interface TrialApplicationProps {
  params: Promise<{
    locale: string;
    dojo: string;
  }>;
}

interface TrialApplication {
  id: string;
  type: "Bjj advance" | "gi" | "nogi" | "mma" | "kickboxing";
  date: string;
  time: string;
  user: {
    name: string;
    email: string;
    phone: string;
    age: number;
    belt?: {
      color: string;
      stripes: number;
    };
    languages: string[];
    note?: string;
    hasProfile?: boolean; // indicates if user has a full profile
    profileUrl?: string; // URL to user's profile
  };
  status: "pending" | "accepted" | "declined";
}

const mockTrialApplications: TrialApplication[] = [
  {
    id: "1",
    type: "Bjj advance",
    date: "2024-12-25",
    time: "19:00",
    user: {
      name: "Alexandre Dubois",
      email: "alex.dubois@email.com",
      phone: "+41 79 123 4567",
      age: 28,
      belt: { color: "blue", stripes: 2 },
      languages: ["French", "English"],
      note: "I have been training BJJ for 3 years and want to advance my skills. Looking forward to joining your advanced class!",
      hasProfile: true,
      profileUrl: "/profile/1",
    },
    status: "pending",
  },
  {
    id: "2",
    type: "gi",
    date: "2024-12-26",
    time: "18:30",
    user: {
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "+41 78 234 5678",
      age: 24,
      languages: ["Spanish", "English", "French"],
      note: "Complete beginner, very excited to start my BJJ journey!",
    },
    status: "pending",
  },
  {
    id: "3",
    type: "nogi",
    date: "2024-12-27",
    time: "20:00",
    user: {
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+41 77 345 6789",
      age: 32,
      belt: { color: "purple", stripes: 1 },
      languages: ["English"],
      note: "Experienced in wrestling, looking to transition to BJJ no-gi. Can I bring my own rash guard?",
      hasProfile: true,
      profileUrl: "/profile/3",
    },
    status: "pending",
  },
  {
    id: "4",
    type: "mma",
    date: "2024-12-28",
    time: "19:30",
    user: {
      name: "Sophie Chen",
      email: "sophie.chen@email.com",
      phone: "+41 76 456 7890",
      age: 26,
      languages: ["Chinese", "English", "French"],
      note: "I have some boxing experience and want to learn MMA. What equipment do I need?",
    },
    status: "pending",
  },
  {
    id: "5",
    type: "kickboxing",
    date: "2024-12-29",
    time: "18:00",
    user: {
      name: "Marco Bianchi",
      email: "marco.bianchi@email.com",
      phone: "+41 75 567 8901",
      age: 30,
      languages: ["Italian", "French", "English"],
      note: "Looking for a good workout and self-defense skills. Is this suitable for beginners?",
    },
    status: "pending",
  },
  {
    id: "6",
    type: "gi",
    date: "2024-12-30",
    time: "19:00",
    user: {
      name: "Emma Thompson",
      email: "emma.thompson@email.com",
      phone: "+41 74 678 9012",
      age: 22,
      belt: { color: "white", stripes: 3 },
      languages: ["English", "German"],
      note: "I've been training for 6 months at another gym. Looking for a more competitive environment.",
    },
    status: "pending",
  },
  {
    id: "7",
    type: "Bjj advance",
    date: "2025-01-02",
    time: "20:30",
    user: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+41 73 789 0123",
      age: 35,
      belt: { color: "brown", stripes: 0 },
      languages: ["Arabic", "English", "French"],
      note: "Brown belt from Egypt, recently moved to Switzerland. Want to continue training at a high level.",
      hasProfile: true,
      profileUrl: "/profile/7",
    },
    status: "pending",
  },
  {
    id: "8",
    type: "nogi",
    date: "2025-01-03",
    time: "18:30",
    user: {
      name: "Lisa Müller",
      email: "lisa.mueller@email.com",
      phone: "+41 72 890 1234",
      age: 29,
      languages: ["German", "English"],
      note: "I prefer no-gi training. Do you have women-only classes or mixed classes?",
    },
    status: "pending",
  },
];

const getTypeColor = (type: string) => {
  const colors = {
    "Bjj advance": "rgba(59, 130, 246, 0.7)", // blue with 70% opacity
    gi: "rgba(34, 197, 94, 0.7)", // green with 70% opacity
    nogi: "rgba(168, 85, 247, 0.7)", // purple with 70% opacity
    mma: "rgba(239, 68, 68, 0.7)", // red with 70% opacity
    kickboxing: "rgba(251, 191, 36, 0.7)", // yellow with 70% opacity
  };
  return colors[type as keyof typeof colors] || "rgb(63, 67, 70)";
};

const getBeltColor = (belt: { color: string; stripes: number }) => {
  const colors = {
    white: "rgb(255, 255, 255)",
    yellow: "rgb(255, 255, 0)",
    orange: "rgb(255, 165, 0)",
    green: "rgb(0, 128, 0)",
    blue: "rgb(0, 0, 255)",
    purple: "rgb(128, 0, 128)",
    brown: "rgb(139, 69, 19)",
    black: "rgb(0, 0, 0)",
    red: "rgb(255, 0, 0)",
  };
  return colors[belt.color as keyof typeof colors] || "rgb(255, 255, 255)";
};

export default function TrialApplicationsPage({
  params,
}: TrialApplicationProps) {
  const [applications, setApplications] = useState<TrialApplication[]>([]);
  const [locale, setLocale] = useState<string>("en");

  // Load applications with dynamic locale
  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);

      // Update profile URLs with current locale
      const updatedApplications = mockTrialApplications.map((app) => ({
        ...app,
        user: {
          ...app.user,
          profileUrl: app.user.profileUrl
            ? `/${resolvedParams.locale}${app.user.profileUrl.replace(
                "/en",
                ""
              )}`
            : undefined,
        },
      }));

      setApplications(updatedApplications);
    };

    loadData();
  }, [params]);

  const handleAccept = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "accepted" as const } : app
      )
    );
  };

  const handleDecline = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "declined" as const } : app
      )
    );
  };

  const handleChangeDateTime = (id: string) => {
    // In a real app, this would open a modal or form
    alert(`Change date/time for application ${id}`);
  };

  const pendingApplications = applications.filter(
    (app) => app.status === "pending"
  );
  const acceptedApplications = applications.filter(
    (app) => app.status === "accepted"
  );
  const declinedApplications = applications.filter(
    (app) => app.status === "declined"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            Trial Applications
          </h1>
          <p className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
            {applications.length} total applications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "rgba(251, 191, 36, 0.7)" }}
            ></div>
            <span className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
              {pendingApplications.length} pending
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.7)" }}
            ></div>
            <span className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
              {acceptedApplications.length} accepted
            </span>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {applications.map((application) => (
          <div
            key={application.id}
            className="flex items-center justify-between p-4 rounded-lg hover:shadow-md transition-all duration-200"
            style={{
              backgroundColor: "rgb(42, 46, 49)",
              borderLeft: `4px solid ${
                application.status === "pending"
                  ? "rgb(251, 191, 36)"
                  : application.status === "accepted"
                  ? "rgb(34, 197, 94)"
                  : "rgb(239, 68, 68)"
              }`,
            }}
          >
            {/* Left: Avatar and Basic Info */}
            <div className="flex items-center space-x-4 flex-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgb(63, 67, 70)" }}
              >
                <User
                  className="h-5 w-5"
                  style={{ color: "rgb(180, 180, 180)" }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: "rgb(255, 255, 255)" }}
                  >
                    {application.user.name}
                  </h3>
                  <Badge
                    style={{
                      backgroundColor: getTypeColor(application.type),
                      color: "rgb(255, 255, 255)",
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                    }}
                  >
                    {application.type}
                  </Badge>
                  {application.user.belt && (
                    <div className="flex items-center space-x-1">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{
                          backgroundColor: getBeltColor(application.user.belt),
                          borderColor: "rgb(63, 67, 70)",
                        }}
                      ></div>
                      <span
                        className="text-xs capitalize"
                        style={{ color: "rgb(180, 180, 180)" }}
                      >
                        {application.user.belt.color}
                        {application.user.belt.stripes > 0 &&
                          `+${application.user.belt.stripes}`}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className="flex items-center space-x-4 text-sm"
                  style={{ color: "rgb(180, 180, 180)" }}
                >
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(application.date).toLocaleDateString("en-US")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {application.time}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {application.user.age} years
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {application.user.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    {application.user.phone}
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-3 h-3 mr-1" />
                    {application.user.languages.join(", ")}
                  </div>
                </div>

                {application.user.note && (
                  <p
                    className="text-sm mt-2 line-clamp-1"
                    style={{ color: "rgb(150, 150, 150)" }}
                  >
                    "{application.user.note}"
                  </p>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2">
              {application.status === "pending" && (
                <>
                  {application.user.hasProfile && (
                    <Button
                      onClick={() =>
                        window.open(application.user.profileUrl, "_blank")
                      }
                      variant="outline"
                      size="sm"
                      style={{
                        borderColor: "rgb(107, 114, 128)",
                        color: "rgb(107, 114, 128)",
                        padding: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(107, 114, 128, 0.1)";
                        e.currentTarget.style.borderColor = "rgb(75, 85, 99)";
                        e.currentTarget.style.color = "rgb(75, 85, 99)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor =
                          "rgb(107, 114, 128)";
                        e.currentTarget.style.color = "rgb(107, 114, 128)";
                      }}
                    >
                      <User className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    onClick={() => handleAccept(application.id)}
                    size="sm"
                    style={{
                      backgroundColor: "rgb(16, 185, 129)", // softer green
                      padding: "0.5rem 1rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgb(5, 150, 105)"; // darker green on hover
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgb(16, 185, 129)"; // original green
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleDecline(application.id)}
                    variant="outline"
                    size="sm"
                    style={{
                      borderColor: "rgb(239, 68, 68)",
                      color: "rgb(239, 68, 68)",
                      padding: "0.5rem 1rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(239, 68, 68, 0.1)"; // light red background on hover
                      e.currentTarget.style.borderColor = "rgb(220, 38, 38)"; // darker red border
                      e.currentTarget.style.color = "rgb(220, 38, 38)"; // darker red text
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"; // transparent background
                      e.currentTarget.style.borderColor = "rgb(239, 68, 68)"; // original red border
                      e.currentTarget.style.color = "rgb(239, 68, 68)"; // original red text
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleChangeDateTime(application.id)}
                    variant="outline"
                    size="sm"
                    style={{
                      borderColor: "rgb(3, 126, 168)",
                      color: "rgb(3, 126, 168)",
                      padding: "0.5rem 1rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(3, 126, 168, 0.1)"; // light blue background on hover
                      e.currentTarget.style.borderColor = "rgb(2, 100, 140)"; // darker blue border
                      e.currentTarget.style.color = "rgb(2, 100, 140)"; // darker blue text
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"; // transparent background
                      e.currentTarget.style.borderColor = "rgb(3, 126, 168)"; // original blue border
                      e.currentTarget.style.color = "rgb(3, 126, 168)"; // original blue text
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
