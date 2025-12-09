"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin, Clock, Bookmark, House } from "lucide-react";
import { Event, EventCategory } from "@/types/event";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { EventDialog } from "./EventDialog";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

// Function to get category colors with transparency
const getCategoryColor = (category: EventCategory): string => {
  const colorMap: Record<EventCategory, string> = {
    womens: "rgba(236, 72, 153, 0.7)", // pink-500 with 70% opacity
    openMat: "rgba(34, 197, 94, 0.7)", // green-500 with 70% opacity
    competitions: "rgba(239, 68, 68, 0.7)", // red-500 with 70% opacity
    seminar: "rgba(59, 130, 246, 0.7)", // blue-500 with 70% opacity
    kids: "rgba(249, 115, 22, 0.7)", // orange-500 with 70% opacity
    camps: "rgba(139, 92, 246, 0.7)", // violet-500 with 70% opacity
  };
  return colorMap[category];
};

export function EventCard({ event, isPast = false }: EventCardProps) {
  const t = useTranslations("events");
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShowMore = () => {
    if (event.category === "competitions" || event.category === "camps") {
      // Navigate to event detail page
      router.push(`/events/${event.id}`);
    } else {
      // Open dialog for other event types
      setShowDialog(true);
    }
  };

  return (
    <div
      className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
      style={{
        backgroundColor: "rgb(42, 46, 49)",
      }}
    >
      {/* Event Image */}
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className={`object-cover ${isPast ? "grayscale opacity-60" : ""}`}
        />
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span
            className="font-semibold px-3 py-1 rounded-md text-sm"
            style={{
              backgroundColor: "rgba(42, 46, 49, 0.95)",
              color: "rgb(255, 255, 255)",
            }}
          >
            {event.pricing === "free" ? "Free" : `CHF ${event.price}`}
          </span>
        </div>
      </div>

      {/* Type and Style Badges */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {/* Event Type Badge */}
          <span
            className="text-white px-3 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: getCategoryColor(event.category),
            }}
          >
            {t(`categories.${event.category}`)}
          </span>

          {/* Style Badge */}
          <span
            className="px-3 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: "rgb(63, 67, 70)",
              color: "rgb(180, 180, 180)",
            }}
          >
            {event.types.map((type) => t(`types.${type}`)).join(" + ")}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <h3
          className="font-bold text-xl mb-2 line-clamp-2"
          style={{ color: "rgb(255, 255, 255)" }}
        >
          {event.name}
        </h3>

        <div
          className="space-y-3 text-sm"
          style={{ color: "rgb(180, 180, 180)" }}
        >
          {/* Date and Time */}
          <div className="flex items-center gap-2">
            <Clock
              className="h-4 w-4"
              style={{ color: "rgb(180, 180, 180)" }}
            />
            <span>
              {formatDate(event.date)} • {event.timeFrom} - {event.timeTo}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin
              className="h-4 w-4"
              style={{ color: "rgb(180, 180, 180)" }}
            />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline line-clamp-1"
              style={{ color: "rgb(3, 126, 168)" }}
            >
              {event.address}
            </a>
          </div>
          {/* Organizer Name */}
          <div className="flex items-center gap-2">
            <House
              className="h-4 w-4"
              style={{ color: "rgb(180, 180, 180)" }}
            />
            <span style={{ color: "rgb(180, 180, 180)" }}>
              {event.organizer}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm mt-4 line-clamp-2 flex-1"
          style={{ color: "rgb(180, 180, 180)" }}
        >
          {event.description}
        </p>

        {/* Action Buttons */}
        <div
          className="mt-4 pt-4"
          style={{ borderTopColor: "rgb(63, 67, 70)" }}
        >
          <div className="flex gap-2">
            <button
              className="flex-1 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-white"
              style={{
                backgroundColor: isPast
                  ? event.category === "competitions"
                    ? "rgb(63, 67, 70)"
                    : "rgb(63, 67, 70)"
                  : "rgb(3, 126, 168)",
                opacity: isPast && event.category !== "competitions" ? 0.5 : 1,
                cursor:
                  isPast && event.category !== "competitions"
                    ? "not-allowed"
                    : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isPast || event.category === "competitions") {
                  e.currentTarget.style.backgroundColor = "rgb(2, 100, 140)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isPast || event.category === "competitions") {
                  e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)";
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleShowMore();
              }}
              disabled={isPast && event.category !== "competitions"}
            >
              Show more
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleBookmarkToggle();
              }}
              className="p-2 rounded-md transition-colors duration-200 text-white"
              style={{
                backgroundColor: isBookmarked
                  ? "rgb(3, 126, 168)"
                  : "rgb(63, 67, 70)",
              }}
              onMouseEnter={(e) => {
                if (!isBookmarked) {
                  e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isBookmarked) {
                  e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)";
                }
              }}
              title={
                isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
              }
            >
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Event Dialog */}
      <EventDialog
        event={event}
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}
