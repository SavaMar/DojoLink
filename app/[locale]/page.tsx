"use client";

import { useState, useMemo } from "react";
import { EventCard } from "@/components/EventCard";
import { EventFilters } from "@/components/EventFilters";
import { mockEvents } from "@/data/events";
import type { EventFilters as EventFiltersType } from "@/types/event";
import { isEventInPast } from "@/lib/utils";

export default function HomePage() {
  const [filters, setFilters] = useState<EventFiltersType>({});
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      // Filter by category
      if (filters.category && event.category !== filters.category) return false;

      // Filter by canton
      if (filters.canton && event.canton !== filters.canton) return false;

      // Filter by type
      if (filters.type && !event.types.includes(filters.type)) return false;

      // Filter by pricing
      if (filters.pricing && event.pricing !== filters.pricing) return false;

      // Filter by past events
      if (!showPastEvents && isEventInPast(event.date)) return false;

      return true;
    });
  }, [filters, showPastEvents]);

  const handleFiltersChange = (newFilters: EventFiltersType) => {
    setFilters(newFilters);
  };

  const handleTogglePastEvents = () => {
    setShowPastEvents(!showPastEvents);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 border-b w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 w-full">
              Jiu Jitsu events, cms and community
            </h1>
            <p className="text-lg text-gray-600 w-full">
              Discover and connect with the Swiss BJJ community through events,
              seminars, competitions, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <EventFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          eventCount={filteredEvents.length}
          events={mockEvents}
          showPastEvents={showPastEvents}
          onTogglePastEvents={handleTogglePastEvents}
        />

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isPast={isEventInPast(event.date)}
            />
          ))}
        </div>

        {/* No Events Found */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
