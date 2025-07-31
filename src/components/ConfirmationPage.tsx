import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, Clock, MapPin, Download, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { BookingFormData } from "./BookingForm";

interface ConfirmationPageProps {
  eventType: string;
  selectedDate: Date;
  selectedTime: string;
  bookingData: BookingFormData;
  onBackToStart: () => void;
}

export const ConfirmationPage = ({ 
  eventType, 
  selectedDate, 
  selectedTime, 
  bookingData, 
  onBackToStart 
}: ConfirmationPageProps) => {
  const handleDownloadICS = () => {
    // ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cal ID//Cal ID//EN
BEGIN:VEVENT
UID:${Date.now()}@calid.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${selectedDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${eventType} between Sanskar Yadav and ${bookingData.name}
DESCRIPTION:${bookingData.notes || 'No additional notes provided.'}
LOCATION:Google Meet
ORGANIZER:mailto:sanskar.yadav@onehash.ai
ATTENDEE:mailto:${bookingData.email}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meeting.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
          This meeting is scheduled
        </h1>
        <p className="text-lg text-neutral-600">
          We sent an email with a calendar invitation with the details to everyone.
        </p>
      </div>

      {/* Meeting Details */}
      <Card className="p-8 border-neutral-200 text-left mb-8">
        <div className="space-y-6">
          <div className="grid grid-cols-[80px_1fr] gap-4">
            <span className="text-sm font-medium text-neutral-600">What</span>
            <span className="text-sm text-neutral-900">
              {eventType} between Sanskar Yadav and {bookingData.name}
            </span>
          </div>

          <div className="grid grid-cols-[80px_1fr] gap-4">
            <span className="text-sm font-medium text-neutral-600">When</span>
            <div className="space-y-1">
              <div className="text-sm text-neutral-900">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </div>
              <div className="text-sm text-neutral-600">
                {selectedTime} - 5:00 PM (India Standard Time)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[80px_1fr] gap-4">
            <span className="text-sm font-medium text-neutral-600">Who</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-900">Sanskar Yadav</span>
                <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Host</span>
              </div>
              <div className="text-sm text-neutral-600">sanskarix@gmail.com</div>
              <div className="text-sm text-neutral-900">{bookingData.name}</div>
              <div className="text-sm text-neutral-600">{bookingData.email}</div>
            </div>
          </div>

          <div className="grid grid-cols-[80px_1fr] gap-4">
            <span className="text-sm font-medium text-neutral-600">Where</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-900">Google Meet</span>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-primary hover:bg-primary/10">
                Open
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">
          Need to make a change?{" "}
          <Button variant="link" className="p-0 h-auto text-primary hover:underline">
            Reschedule
          </Button>{" "}
          or{" "}
          <Button variant="link" className="p-0 h-auto text-primary hover:underline">
            Cancel
          </Button>
        </p>

        {/* Calendar Actions */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            onClick={handleDownloadICS}
            className="flex items-center gap-2 border-neutral-200"
          >
            <Download className="w-4 h-4" />
            Add to calendar
          </Button>
        </div>

        {/* Back to Start */}
        <div className="pt-8">
          <Button
            variant="ghost"
            onClick={onBackToStart}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to bookings
          </Button>
        </div>
      </div>
    </div>
  );
};