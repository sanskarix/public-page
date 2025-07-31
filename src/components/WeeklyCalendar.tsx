import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isAfter, startOfToday, addWeeks, subWeeks } from "date-fns";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface WeeklyCalendarProps {
  selectedDate?: Date;
  selectedTime?: string;
  onDateTimeSelect: (date: Date, time: string) => void;
  availableSlots?: { [key: string]: TimeSlot[] };
}

export const WeeklyCalendar = ({ selectedDate, selectedTime, onDateTimeSelect, availableSlots }: WeeklyCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const today = startOfToday();
  
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const timeSlots = [
    "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45", "17:00"
  ];

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek(direction === "next" ? addWeeks(currentWeek, 1) : subWeeks(currentWeek, 1));
  };

  const isTimeAvailable = (date: Date, time: string) => {
    if (!isAfter(date, today) && !isToday(date)) return false;
    const dateKey = format(date, "yyyy-MM-dd");
    if (availableSlots && availableSlots[dateKey]) {
      const slot = availableSlots[dateKey].find(s => s.time === time);
      return slot?.available ?? false;
    }
    return true;
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-neutral-900">
          {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
        </h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("prev")}
            className="h-8 w-8 p-0 hover:bg-neutral-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("next")}
            className="h-8 w-8 p-0 hover:bg-neutral-100"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-8 gap-2 mb-4">
        <div className="p-2"></div>
        {days.map((day) => (
          <div key={day.toISOString()} className="p-2 text-center">
            <div className="text-xs font-medium text-neutral-500 mb-1">
              {format(day, "EEE").toUpperCase()}
            </div>
            <div className={`text-sm font-medium ${isToday(day) ? "text-primary" : "text-neutral-900"}`}>
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 gap-2">
            <div className="p-2 text-right">
              <span className="text-xs text-neutral-500">{time}</span>
            </div>
            {days.map((day) => {
              const isSelected = selectedDate?.toDateString() === day.toDateString() && selectedTime === time;
              const isAvailable = isTimeAvailable(day, time);
              
              return (
                <Button
                  key={`${day.toISOString()}-${time}`}
                  variant="ghost"
                  size="sm"
                  className={`
                    h-8 text-xs transition-all
                    ${isSelected ? "bg-primary text-primary-foreground" : ""}
                    ${isAvailable && !isSelected ? "hover:bg-primary/10 border border-neutral-200" : ""}
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
        ))}
      </div>
    </div>
  );
};