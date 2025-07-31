import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isAfter, startOfToday } from "date-fns";

interface MonthlyCalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  availableDates?: Date[];
}

export const MonthlyCalendar = ({ selectedDate, onDateSelect, availableDates }: MonthlyCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  
  const isDateAvailable = (date: Date) => {
    if (!isAfter(date, today) && !isToday(date)) return false;
    if (availableDates) {
      return availableDates.some(availableDate => 
        availableDate.toDateString() === date.toDateString()
      );
    }
    return true;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-neutral-900">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="h-8 w-8 p-0 hover:bg-neutral-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="h-8 w-8 p-0 hover:bg-neutral-100"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Week Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center">
            <span className="text-xs font-medium text-neutral-500">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected = selectedDate?.toDateString() === day.toDateString();
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isAvailable = isDateAvailable(day);
          const isTodayDate = isToday(day);

          return (
            <Button
              key={day.toISOString()}
              variant="ghost"
              className={`
                h-12 w-12 p-0 text-sm font-medium transition-all
                ${!isCurrentMonth ? "text-neutral-300 cursor-not-allowed" : ""}
                ${isSelected ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                ${isAvailable && !isSelected ? "hover:bg-primary/10 text-neutral-900" : ""}
                ${!isAvailable && isCurrentMonth ? "text-neutral-300 cursor-not-allowed" : ""}
                ${isTodayDate && !isSelected ? "bg-neutral-100 font-semibold" : ""}
              `}
              disabled={!isCurrentMonth || !isAvailable}
              onClick={() => isAvailable && onDateSelect(day)}
            >
              {format(day, "d")}
            </Button>
          );
        })}
      </div>
    </div>
  );
};