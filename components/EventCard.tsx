"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin, Clock, Bookmark, House } from "lucide-react";
import { Event, categoryColors } from "@/types/event";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { EventDialog } from "./EventDialog";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col">
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
          <span className="bg-white/95 text-gray-900 font-semibold px-3 py-1 rounded-md text-sm">
            {event.pricing === "free" ? "Free" : `CHF ${event.price}`}
          </span>
        </div>
      </div>

      {/* Type and Style Badges */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {/* Event Type Badge */}
          <span
            className={`${
              categoryColors[event.category]
            } text-white px-3 py-1 rounded-md text-xs font-medium`}
          >
            {t(`categories.${event.category}`)}
          </span>

          {/* Style Badge */}
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs font-medium">
            {event.types.map((type) => t(`types.${type}`)).join(" + ")}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
          {event.name}
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          {/* Date and Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>
              {formatDate(event.date)} • {event.timeFrom} - {event.timeTo}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline line-clamp-1"
            >
              {event.address}
            </a>
          </div>
          {/* Organizer Name */}
          <div className="flex items-center gap-2">
            <House className="h-4 w-4 text-gray-400" />
            <span className="text-gray-800">{event.organizer}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-4 line-clamp-2 flex-1">
          {event.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex gap-2">
            <button
              className={`flex-1 font-medium py-2 px-4 rounded-md transition-colors duration-200 ${
                isPast
                  ? event.category === "competitions"
                    ? "bg-gray-400 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
              }`}
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
              className={`p-2 rounded-md transition-colors duration-200 ${
                isBookmarked
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
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
