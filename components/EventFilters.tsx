"use client";

import { useTranslations } from "next-intl";
import type { EventFilters, EventCategory, Event } from "@/types/event";

interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  eventCount: number;
  events: Event[];
  showPastEvents: boolean;
  onTogglePastEvents: () => void;
}

export function EventFilters({
  filters,
  onFiltersChange,
  eventCount,
  events,
  showPastEvents,
  onTogglePastEvents,
}: EventFiltersProps) {
  const tEvents = useTranslations("events");

  // Get unique cantons from existing events
  const availableCantons = Array.from(
    new Set(events.map((event) => event.canton))
  ).sort();

  const categories: { value: EventCategory; label: string }[] = [
    {
      value: "womens",
      label: tEvents("categories.womens"),
    },
    {
      value: "openMat",
      label: tEvents("categories.openMat"),
    },
    {
      value: "competitions",
      label: tEvents("categories.competitions"),
    },
    {
      value: "seminar",
      label: tEvents("categories.seminar"),
    },
    {
      value: "kids",
      label: tEvents("categories.kids"),
    },
    {
      value: "camps",
      label: tEvents("categories.camps"),
    },
  ];

  return (
    <div className="mb-8">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              onFiltersChange({
                ...filters,
                category: undefined,
              })
            }
            className="px-4 py-2 rounded-md text-white transition-colors"
            style={{
              backgroundColor: !filters.category
                ? "rgb(228, 80, 56)"
                : "rgb(63, 67, 70)",
            }}
            onMouseEnter={(e) => {
              if (filters.category) {
                e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)";
              }
            }}
            onMouseLeave={(e) => {
              if (filters.category) {
                e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)";
              }
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                // Toggle functionality: if already selected, deselect it
                if (filters.category === category.value) {
                  onFiltersChange({
                    ...filters,
                    category: undefined,
                  });
                } else {
                  onFiltersChange({
                    ...filters,
                    category: category.value,
                  });
                }
              }}
              className="px-4 py-2 rounded-md text-white transition-colors"
              style={{
                backgroundColor:
                  filters.category === category.value
                    ? "rgb(228, 80, 56)"
                    : "rgb(63, 67, 70)",
              }}
              onMouseEnter={(e) => {
                if (filters.category !== category.value) {
                  e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)";
                }
              }}
              onMouseLeave={(e) => {
                if (filters.category !== category.value) {
                  e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)";
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Add Event Button */}
        <button
          onClick={() => {
            // Handle add event - could open a form or navigate to add event page
            window.open("https://forms.gle/YJeddwAdLj9p6uNg9", "_blank");
          }}
          className="px-4 py-2 rounded-md text-white transition-colors flex items-center gap-2"
          style={{ backgroundColor: "rgb(3, 126, 168)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgb(2, 100, 140)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Event
        </button>
      </div>

      {/* Canton Filter Dropdown with Past Events Button */}
      {availableCantons.length > 0 && (
        <div className="mb-4">
          <label
            htmlFor="canton-filter"
            className="block text-sm font-medium mb-1"
            style={{ color: "rgb(180, 180, 180)" }}
          >
            Filter by Canton:
          </label>
          <div className="flex gap-4 items-end">
            <div className="relative flex-1">
              <select
                id="canton-filter"
                value={filters.canton || "all"}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    canton:
                      e.target.value === "all" ? undefined : e.target.value,
                  })
                }
                className="block w-full rounded-md border py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
                style={{
                  backgroundColor: "rgb(63, 67, 70)",
                  borderColor: "rgb(63, 67, 70)",
                  color: "rgb(180, 180, 180)",
                }}
              >
                <option
                  value="all"
                  style={{
                    backgroundColor: "rgb(63, 67, 70)",
                    color: "rgb(180, 180, 180)",
                  }}
                >
                  All Cantons
                </option>
                {availableCantons.map((canton) => (
                  <option
                    key={canton}
                    value={canton}
                    style={{
                      backgroundColor: "rgb(63, 67, 70)",
                      color: "rgb(180, 180, 180)",
                    }}
                  >
                    {canton}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={onTogglePastEvents}
              className="px-4 py-2 rounded-md whitespace-nowrap text-white transition-colors"
              style={{
                backgroundColor: showPastEvents
                  ? "rgb(3, 126, 168)"
                  : "rgb(63, 67, 70)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = showPastEvents
                  ? "rgb(3, 126, 168)"
                  : "rgb(63, 67, 70)")
              }
            >
              {showPastEvents ? "Hide Past Events" : "Show Past Events"}
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm mb-4" style={{ color: "rgb(180, 180, 180)" }}>
        Found events: {eventCount}
      </div>
    </div>
  );
}
