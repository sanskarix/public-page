import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { EventTypeCard } from "./EventTypeCard";
import { CalendarViewToggle, CalendarView } from "./CalendarViewToggle";
import { MonthlyCalendar } from "./MonthlyCalendar";
import { WeeklyCalendar } from "./WeeklyCalendar";
import { ColumnCalendar } from "./ColumnCalendar";
import { BookingForm, BookingFormData } from "./BookingForm";
import { ConfirmationPage } from "./ConfirmationPage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type SchedulingStep = "events" | "calendar" | "booking" | "confirmation";

interface SelectedEvent {
  title: string;
  description: string;
  duration: string;
}

export const SchedulingPage = () => {
  const [currentStep, setCurrentStep] = useState<SchedulingStep>("events");
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const [calendarView, setCalendarView] = useState<CalendarView>("monthly");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const eventTypes = [
    {
      title: "Product Hunt Chats",
      description: "The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!",
      durations: ["15m", "30m", "45m", "60m"]
    },
    {
      title: "Interviews",
      description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
      durations: ["30m", "60m"]
    },
    {
      title: "Product Demo",
      description: "Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)",
      durations: ["30m", "45m"]
    },
    {
      title: "Everything Else",
      description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 🎵",
      durations: ["15m", "30m", "60m"]
    },
    {
      title: "Recurring Event",
      description: "Testing out the recurring feature",
      durations: ["15m"]
    }
  ];

  const handleEventSelect = (eventType: typeof eventTypes[0]) => {
    setSelectedEvent({
      title: eventType.title,
      description: eventType.description,
      duration: eventType.durations[0] // Default to first duration
    });
    setCurrentStep("calendar");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (calendarView === "monthly") {
      // For monthly view, we need to show time selection separately
      // For now, we'll just proceed to booking
      setSelectedTime("16:45"); // Default time
      setCurrentStep("booking");
    }
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep("booking");
  };

  const handleBookingSubmit = (formData: BookingFormData) => {
    setBookingData(formData);
    setCurrentStep("confirmation");
  };

  const handleBackToStart = () => {
    setCurrentStep("events");
    setSelectedEvent(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setBookingData(null);
  };

  const handleBackFromCalendar = () => {
    setCurrentStep("events");
    setSelectedEvent(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  const handleBackFromBooking = () => {
    setCurrentStep("calendar");
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {currentStep === "events" && (
          <div>
            <ProfileHeader />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 max-w-2xl mx-auto">
              {eventTypes.map((eventType, index) => (
                <EventTypeCard
                  key={index}
                  title={eventType.title}
                  description={eventType.description}
                  durations={eventType.durations}
                  onSelect={() => handleEventSelect(eventType)}
                />
              ))}
            </div>
          </div>
        )}

        {currentStep === "calendar" && selectedEvent && (
          <div>
            {/* Header with back button */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={handleBackFromCalendar}
                className="mb-6 text-neutral-600 hover:text-neutral-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
                  {selectedEvent.title}
                </h1>
                <p className="text-neutral-600 max-w-md mx-auto">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="flex justify-center mb-6">
                <CalendarViewToggle
                  currentView={calendarView}
                  onViewChange={setCalendarView}
                />
              </div>
            </div>

            {/* Calendar Views */}
            {calendarView === "monthly" && (
              <div className="max-w-md mx-auto">
                <MonthlyCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>
            )}

            {calendarView === "weekly" && (
              <div className="max-w-5xl mx-auto">
                <WeeklyCalendar
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateTimeSelect={handleDateTimeSelect}
                />
              </div>
            )}

            {calendarView === "column" && (
              <div className="max-w-4xl mx-auto">
                <ColumnCalendar
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateTimeSelect={handleDateTimeSelect}
                />
              </div>
            )}
          </div>
        )}

        {currentStep === "booking" && selectedEvent && selectedDate && selectedTime && (
          <div>
            <BookingForm
              eventType={selectedEvent.title}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleBookingSubmit}
              onBack={handleBackFromBooking}
            />
          </div>
        )}

        {currentStep === "confirmation" && selectedEvent && selectedDate && selectedTime && bookingData && (
          <div>
            <ConfirmationPage
              eventType={selectedEvent.title}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              bookingData={bookingData}
              onBackToStart={handleBackToStart}
            />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-neutral-200">
          <p className="text-xs text-neutral-400">
            Powered by Cal ID
          </p>
        </div>
      </div>
    </div>
  );
};