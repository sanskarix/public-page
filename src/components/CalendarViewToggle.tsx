import { Button } from "@/components/ui/button";
import { Calendar, Grid3X3, Columns3 } from "lucide-react";

export type CalendarView = "monthly" | "weekly" | "column";

interface CalendarViewToggleProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export const CalendarViewToggle = ({ currentView, onViewChange }: CalendarViewToggleProps) => {
  const views = [
    { key: "monthly" as const, label: "Month", icon: Calendar },
    { key: "weekly" as const, label: "Week", icon: Grid3X3 },
    { key: "column" as const, label: "Column", icon: Columns3 },
  ];

  return (
    <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg">
      {views.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={currentView === key ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange(key)}
          className={`
            flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all
            ${currentView === key 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-neutral-600 hover:text-neutral-900 hover:bg-white"
            }
          `}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};