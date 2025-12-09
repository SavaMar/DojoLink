"use client";

import { Dojo } from "@/types/dojo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  Activity,
} from "lucide-react";

interface DashboardOverviewProps {
  dojo: Dojo;
}

export function DashboardOverview({ dojo }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            {dojo.name}
          </h1>
          <p className="mt-1" style={{ color: "rgb(180, 180, 180)" }}>
            {dojo.description}
          </p>
        </div>
        <Badge
          variant="secondary"
          className="text-sm"
          style={{
            backgroundColor: "rgb(63, 67, 70)",
            color: "rgb(255, 255, 255)",
          }}
        >
          <Activity className="w-4 h-4 mr-1" />
          Active
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          style={{
            backgroundColor: "rgb(42, 46, 49)",
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className="text-sm font-medium"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              Total Members
            </CardTitle>
            <Users
              className="h-4 w-4"
              style={{ color: "rgb(180, 180, 180)" }}
            />
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              {dojo.stats.totalMembers}
            </div>
            <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
              {dojo.stats.activeMembers} active
            </p>
          </CardContent>
        </Card>

        <Card
          style={{
            backgroundColor: "rgb(42, 46, 49)",
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className="text-sm font-medium"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              Upcoming Events
            </CardTitle>
            <Calendar
              className="h-4 w-4"
              style={{ color: "rgb(180, 180, 180)" }}
            />
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              {dojo.stats.upcomingEvents}
            </div>
            <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
              {dojo.stats.totalEvents} total events
            </p>
          </CardContent>
        </Card>

        <Card
          style={{
            backgroundColor: "rgb(42, 46, 49)",
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className="text-sm font-medium"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              Location
            </CardTitle>
            <MapPin
              className="h-4 w-4"
              style={{ color: "rgb(180, 180, 180)" }}
            />
          </CardHeader>
          <CardContent>
            <div
              className="text-sm font-medium"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              {dojo.canton}
            </div>
            <p
              className="text-xs truncate"
              style={{ color: "rgb(180, 180, 180)" }}
            >
              {dojo.address}
            </p>
          </CardContent>
        </Card>

        <Card
          style={{
            backgroundColor: "rgb(42, 46, 49)",
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className="text-sm font-medium"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              Member Growth
            </CardTitle>
            <TrendingUp
              className="h-4 w-4"
              style={{ color: "rgb(180, 180, 180)" }}
            />
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold"
              style={{ color: "rgb(34, 197, 94)" }}
            >
              +12%
            </div>
            <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card
          style={{
            backgroundColor: "rgb(42, 46, 49)",
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: "rgb(255, 255, 255)" }}>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  New member joined
                </p>
                <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
                  Sarah Johnson joined 2 hours ago
                </p>
              </div>
              <Clock
                className="h-4 w-4"
                style={{ color: "rgb(180, 180, 180)" }}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  Event created
                </p>
                <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
                  Weekly training session scheduled
                </p>
              </div>
              <Clock
                className="h-4 w-4"
                style={{ color: "rgb(180, 180, 180)" }}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  Payment received
                </p>
                <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
                  Monthly membership fee - CHF 120
                </p>
              </div>
              <Clock
                className="h-4 w-4"
                style={{ color: "rgb(180, 180, 180)" }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card
          style={{
            backgroundColor: "rgb(42, 46, 49)",
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: "rgb(255, 255, 255)" }}>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              className="w-full text-left p-3 rounded-lg border transition-colors"
              style={{
                color: "rgb(255, 255, 255)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div className="font-medium">Create New Event</div>
              <div className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
                Schedule a training session or seminar
              </div>
            </button>
            <button
              className="w-full text-left p-3 rounded-lg border transition-colors"
              style={{
                color: "rgb(255, 255, 255)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div className="font-medium">Add Member</div>
              <div className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
                Register a new dojo member
              </div>
            </button>
            <button
              className="w-full text-left p-3 rounded-lg border transition-colors"
              style={{
                color: "rgb(255, 255, 255)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div className="font-medium">View Analytics</div>
              <div className="text-sm" style={{ color: "rgb(180, 180, 180)" }}>
                Check member engagement and growth
              </div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card
        style={{
          backgroundColor: "rgb(42, 46, 49)",
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: "rgb(255, 255, 255)" }}>
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-4 border rounded-lg"
              style={{ borderColor: "rgb(63, 67, 70)" }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                >
                  <Calendar
                    className="h-6 w-6"
                    style={{ color: "rgb(59, 130, 246)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-medium"
                    style={{ color: "rgb(255, 255, 255)" }}
                  >
                    Weekly Training Session
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgb(180, 180, 180)" }}
                  >
                    Brazilian JiuJitsu - All Levels
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  Dec 22, 2024
                </p>
                <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
                  7:00 PM - 9:00 PM
                </p>
              </div>
            </div>
            <div
              className="flex items-center justify-between p-4 border rounded-lg"
              style={{ borderColor: "rgb(63, 67, 70)" }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                >
                  <Calendar
                    className="h-6 w-6"
                    style={{ color: "rgb(34, 197, 94)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-medium"
                    style={{ color: "rgb(255, 255, 255)" }}
                  >
                    Belt Promotion Ceremony
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgb(180, 180, 180)" }}
                  >
                    Monthly belt testing and promotion
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  Dec 28, 2024
                </p>
                <p className="text-xs" style={{ color: "rgb(180, 180, 180)" }}>
                  6:00 PM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
