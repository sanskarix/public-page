import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface EventTypeCardProps {
  title: string;
  description: string;
  durations: string[];
  onSelect: () => void;
}

export const EventTypeCard = ({ title, description, durations, onSelect }: EventTypeCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-neutral-200 hover:border-primary/20 cursor-pointer group" onClick={onSelect}>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium text-neutral-900 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <Clock className="w-4 h-4 text-neutral-500" />
          <div className="flex gap-2 flex-wrap">
            {durations.map((duration) => (
              <span
                key={duration}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
              >
                {duration}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-primary hover:bg-primary/5 font-medium"
        >
          Select
        </Button>
      </div>
    </Card>
  );
};