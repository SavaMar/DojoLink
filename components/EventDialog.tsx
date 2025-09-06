"use client";

import { X, MapPin, Clock, ExternalLink, Instagram } from "lucide-react";
import { Event } from "@/types/event";
import { formatDate, getGoogleMapsUrl } from "@/lib/utils";

interface EventDialogProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDialog({ event, isOpen, onClose }: EventDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Event Image */}
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            {/* Date and Time */}
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">
                {formatDate(event.date)} • {event.timeFrom} - {event.timeTo}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <a
                href={getGoogleMapsUrl(event.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {event.address}
              </a>
            </div>

            {/* Organizer */}
            <div className="text-gray-600">
              <span className="font-medium">Organized by: </span>
              {event.organizerLink ? (
                <a
                  href={event.organizerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  {event.organizer}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <span className="text-gray-900">{event.organizer}</span>
              )}
            </div>

            {/* Special Dates */}
            {event.earlyBirdDate && (
              <div className="text-orange-600">
                <span className="font-medium">Early Bird Deadline: </span>
                {formatDate(event.earlyBirdDate)}
              </div>
            )}
            {event.competitionDate && (
              <div className="text-red-600">
                <span className="font-medium">Competition Date: </span>
                {formatDate(event.competitionDate)}
              </div>
            )}
            {event.registerTillDate && (
              <div className="text-blue-600">
                <span className="font-medium">Registration Deadline: </span>
                {formatDate(event.registerTillDate)}
              </div>
            )}

            {/* Instagram Link for Seminars */}
            {event.instagramLink && event.category === "seminar" && (
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-600" />
                <a
                  href={event.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  Follow on Instagram
                </a>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Price:</span>
                <span className="text-2xl font-bold text-gray-900">
                  {event.pricing === "free" ? "Free" : `CHF ${event.price}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Apply Button */}
        <div className="p-6 border-t bg-gray-50">
          <button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            onClick={() => {
              // Handle apply logic here
              console.log("Apply for event:", event.id);
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
