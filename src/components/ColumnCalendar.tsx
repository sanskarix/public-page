import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isToday, isAfter, startOfToday } from "date-fns";

interface ColumnCalendarProps {
  selectedDate?: Date;
  selectedTime?: string;
  onDateTimeSelect: (date: Date, time: string) => void;
}

export const ColumnCalendar = ({ selectedDate, selectedTime, onDateTimeSelect }: ColumnCalendarProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const today = startOfToday();
  
  const days = Array.from({ length: 5 }, (_, i) => addDays(startDate, i));
  
  const timeSlots = [
    "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45"
  ];

  const navigateDays = (direction: "prev" | "next") => {
    setStartDate(addDays(startDate, direction === "next" ? 5 : -5));
  };

  const isTimeAvailable = (date: Date, time: string) => {
    if (!isAfter(date, today) && !isToday(date)) return false;
    // Mock availability - in real app this would come from props
    return Math.random() > 0.3;
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-neutral-900">
          {format(startDate, "MMM d")} - {format(addDays(startDate, 4), "MMM d, yyyy")}
        </h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateDays("prev")}
            className="h-8 w-8 p-0 hover:bg-neutral-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateDays("next")}
            className="h-8 w-8 p-0 hover:bg-neutral-100"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-5 gap-4">
        {days.map((day, dayIndex) => (
          <div key={day.toISOString()} className="space-y-2">
            {/* Day Header */}
            <div className="text-center pb-3 border-b border-neutral-100">
              <div className="text-xs font-medium text-neutral-500 mb-1">
                {format(day, "EEE").toUpperCase()}
              </div>
              <div className={`text-lg font-medium ${isToday(day) ? "text-primary" : "text-neutral-900"}`}>
                {format(day, "d")}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {timeSlots.map((time) => {
                const isSelected = selectedDate?.toDateString() === day.toDateString() && selectedTime === time;
                const isAvailable = isTimeAvailable(day, time);
                
                return (
                  <Button
                    key={`${day.toISOString()}-${time}`}
                    variant="ghost"
                    size="sm"
                    className={`
                      w-full h-8 text-xs transition-all
                      ${isSelected ? "bg-primary text-primary-foreground" : ""}
                      ${isAvailable && !isSelected ? "hover:bg-primary/10 border border-neutral-200 text-neutral-700" : ""}
                      ${!isAvailable ? "cursor-not-allowed opacity-30" : ""}
                    `}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && onDateTimeSelect(day, time)}
                  >
                    {isAvailable ? time : ""}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};