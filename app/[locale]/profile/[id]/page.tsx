"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Languages,
  Trophy,
  Calendar,
  Award,
  Users,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProfileData {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  belt: {
    color: string;
    stripes: number;
  };
  nationality: string;
  languages: string[];
  academies: {
    name: string;
    location: string;
    current: boolean;
    belt: string;
  }[];
  competitions: {
    name: string;
    location: string;
    date: string;
    belt: string;
    result: string;
    method?: string;
    medal?: string;
  }[];
  seminars: {
    name: string;
    instructor: string;
    location: string;
    date: string;
  }[];
  camps: {
    name: string;
    location: string;
    date: string;
  }[];
  personalTrainer?: {
    name: string;
    belt: string;
    academy: string;
  };
}

const mockProfileData: Record<string, ProfileData> = {
  "1": {
    id: "1",
    name: "Alexandre Dubois",
    nickname: "Alex",
    avatar:
      "https://ufclivepubstorage.blob.core.windows.net/public-files/05aec0dc-feda-44f4-a1ef-07c2813980ed%2FNURMAGOMEDOV_KHABIB_BELT_10-24.png",
    belt: {
      color: "blue",
      stripes: 2,
    },
    nationality: "France",
    languages: ["French", "English"],
    academies: [
      {
        name: "Asgard Academy",
        location: "Zurich",
        current: false,
        belt: "white",
      },
      {
        name: "Frota Academy",
        location: "Zurich",
        current: true,
        belt: "blue",
      },
    ],
    competitions: [
      {
        name: "AJP Geneva Competition",
        location: "Geneva",
        date: "2023-03-15",
        belt: "white",
        result: "Bronze",
        method: "Arm bar submission",
        medal: "🥉",
      },
      {
        name: "AJP Geneva Competition",
        location: "Geneva",
        date: "2023-06-20",
        belt: "white",
        result: "Silver",
        method: "Points",
        medal: "🥈",
      },
      {
        name: "AJP Geneva Competition",
        location: "Geneva",
        date: "2023-09-10",
        belt: "white",
        result: "Lost",
        method: "Kimura submission",
      },
      {
        name: "AJP Zurich Competition",
        location: "Zurich",
        date: "2024-05-12",
        belt: "blue",
        result: "Won",
        method: "Points",
      },
    ],
    seminars: [
      {
        name: "Pablo Lotko Seminar",
        instructor: "Pablo Lotko",
        location: "Icon Dojo, Lausanne",
        date: "2024-02-15",
      },
      {
        name: "Adam Wolz Seminar",
        instructor: "Adam Wolz",
        location: "Fusion Sport Academy, Bern",
        date: "2024-08-20",
      },
    ],
    camps: [
      {
        name: "Globetrotter Camp",
        location: "Parnu, Estonia",
        date: "2024-07-10",
      },
    ],
    personalTrainer: {
      name: "Stefan Blau",
      belt: "Black Belt",
      academy: "Frota Academy, Zurich",
    },
  },
};

const getBeltColor = (belt: string) => {
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
  return colors[belt as keyof typeof colors] || "rgb(255, 255, 255)";
};

const getBeltDisplayName = (belt: string, stripes: number) => {
  const stripeText =
    stripes > 0 ? ` (${stripes} stripe${stripes > 1 ? "s" : ""})` : "";
  return `${belt.charAt(0).toUpperCase() + belt.slice(1)} Belt${stripeText}`;
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const resolvedParams = await params;
      const profileData = mockProfileData[resolvedParams.id];
      setProfile(profileData || null);
      setLoading(false);
    };

    loadProfile();
  }, [params]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "rgb(33, 37, 40)" }}
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "rgb(33, 37, 40)" }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Profile Not Found
          </h1>
          <Link href="/">
            <Button style={{ backgroundColor: "rgb(3, 126, 168)" }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "rgb(33, 37, 40)" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              style={{
                borderColor: "rgb(63, 67, 70)",
                color: "rgb(180, 180, 180)",
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Profile Header */}
        <Card className="mb-6" style={{ backgroundColor: "rgb(42, 46, 49)" }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-2"
                  style={{ borderColor: getBeltColor(profile.belt.color) }}
                />
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {profile.name}
                  </h1>
                  {profile.nickname && (
                    <Badge
                      style={{
                        backgroundColor: "rgba(3, 126, 168, 0.7)",
                        color: "white",
                      }}
                    >
                      &quot;{profile.nickname}&quot;
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm mb-4">
                  <div
                    className="flex items-center"
                    style={{ color: "rgb(180, 180, 180)" }}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.nationality}
                  </div>
                  <div
                    className="flex items-center"
                    style={{ color: "rgb(180, 180, 180)" }}
                  >
                    <Languages className="w-4 h-4 mr-1" />
                    {profile.languages.join(", ")}
                  </div>
                </div>

                {/* Belt Info */}
                <div className="flex items-center space-x-2">
                  <div
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: getBeltColor(profile.belt.color),
                      color: profile.belt.color === "white" ? "black" : "white",
                    }}
                  >
                    {getBeltDisplayName(
                      profile.belt.color,
                      profile.belt.stripes
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Academy */}
          <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Current Academy
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.academies
                .filter((academy) => academy.current)
                .map((academy, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "rgb(63, 67, 70)" }}
                  >
                    <h3 className="font-semibold text-white">{academy.name}</h3>
                    <p
                      className="text-sm"
                      style={{ color: "rgb(180, 180, 180)" }}
                    >
                      {academy.location}
                    </p>
                    <div className="mt-2">
                      <Badge
                        style={{
                          backgroundColor: getBeltColor(academy.belt),
                          color: academy.belt === "white" ? "black" : "white",
                        }}
                      >
                        {academy.belt.charAt(0).toUpperCase() +
                          academy.belt.slice(1)}{" "}
                        Belt
                      </Badge>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Personal Trainer */}
          {profile.personalTrainer && (
            <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Trainer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "rgb(63, 67, 70)" }}
                >
                  <h3 className="font-semibold text-white">
                    {profile.personalTrainer.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgb(180, 180, 180)" }}
                  >
                    {profile.personalTrainer.academy}
                  </p>
                  <div className="mt-2">
                    <Badge
                      style={{
                        backgroundColor: getBeltColor("black"),
                        color: "white",
                      }}
                    >
                      {profile.personalTrainer.belt}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Competition History */}
        <Card className="mt-6" style={{ backgroundColor: "rgb(42, 46, 49)" }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Competition History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.competitions.map((comp, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: "rgb(63, 67, 70)" }}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-white">{comp.name}</h3>
                      <Badge
                        style={{
                          backgroundColor: getBeltColor(comp.belt),
                          color: comp.belt === "white" ? "black" : "white",
                        }}
                      >
                        {comp.belt.charAt(0).toUpperCase() + comp.belt.slice(1)}
                      </Badge>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "rgb(180, 180, 180)" }}
                    >
                      {comp.location} •{" "}
                      {new Date(comp.date).toLocaleDateString("en-US")}
                    </p>
                    {comp.method && (
                      <p
                        className="text-sm"
                        style={{ color: "rgb(150, 150, 150)" }}
                      >
                        {comp.method}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {comp.medal && (
                        <span className="text-2xl">{comp.medal}</span>
                      )}
                      <span
                        className="font-semibold"
                        style={{
                          color:
                            comp.result === "Lost"
                              ? "rgb(239, 68, 68)"
                              : comp.result === "Won"
                              ? "rgb(34, 197, 94)"
                              : "rgb(251, 191, 36)",
                        }}
                      >
                        {comp.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Seminars */}
          <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Seminars Attended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.seminars.map((seminar, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "rgb(63, 67, 70)" }}
                  >
                    <h4 className="font-semibold text-white">{seminar.name}</h4>
                    <p
                      className="text-sm"
                      style={{ color: "rgb(180, 180, 180)" }}
                    >
                      with {seminar.instructor}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "rgb(150, 150, 150)" }}
                    >
                      {seminar.location} •{" "}
                      {new Date(seminar.date).toLocaleDateString("en-US")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Camps */}
          <Card style={{ backgroundColor: "rgb(42, 46, 49)" }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Camps Attended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.camps.map((camp, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "rgb(63, 67, 70)" }}
                  >
                    <h4 className="font-semibold text-white">{camp.name}</h4>
                    <p
                      className="text-sm"
                      style={{ color: "rgb(180, 180, 180)" }}
                    >
                      {camp.location}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "rgb(150, 150, 150)" }}
                    >
                      {new Date(camp.date).toLocaleDateString("en-US")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
