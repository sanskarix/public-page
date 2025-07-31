import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, User, Mail, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface BookingFormProps {
  eventType: string;
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (formData: BookingFormData) => void;
  onBack: () => void;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

export const BookingForm = ({ eventType, selectedDate, selectedTime, onSubmit, onBack }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Partial<BookingFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Event Summary */}
      <Card className="p-6 mb-8 border-neutral-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-medium text-neutral-900 mb-3">{eventType}</h2>
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{selectedTime} - {/* Add end time calculation */}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Google Meet</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Booking Form */}
      <Card className="p-8 border-neutral-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-neutral-900 mb-2 block">
                Your name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Sanskar Yadav"
                className={`h-12 ${errors.name ? "border-destructive" : "border-neutral-200 focus:border-primary"}`}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-neutral-900 mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="sanskar.yadav@onehash.ai"
                className={`h-12 ${errors.email ? "border-destructive" : "border-neutral-200 focus:border-primary"}`}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-neutral-900 mb-2 block">
                Phone Number
              </Label>
              <div className="flex">
                <div className="flex items-center px-3 bg-neutral-50 border border-r-0 border-neutral-200 rounded-l-md">
                  <span className="text-sm text-neutral-600">🇮🇳 +91</span>
                </div>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder=""
                  className="h-12 rounded-l-none border-neutral-200 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-neutral-900 mb-2 block">
                Additional notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Please share anything that will help prepare for our meeting."
                className="min-h-[100px] border-neutral-200 focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-neutral-500 mb-6">
              By proceeding, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
              >
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};