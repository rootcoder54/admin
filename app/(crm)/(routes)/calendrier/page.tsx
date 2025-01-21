"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import frLocale from "@fullcalendar/core/locales/fr";
import { useState } from "react";
import { useCardModal } from "@/hooks/use-card-modal";

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const cardModal = useCardModal();

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    //alert(`Vous avez cliqué sur la date : ${info.dateStr}`);
    cardModal.onOpen("076a28d1-05de-440f-bf8e-07023a1ab4b7")
  };
  return (
    <div className="w-full min-h-screen p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineWeek,dayGridMonth,timeGridWeek"
        }}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
          {
            title: "Maintenance du Mois",
            start: new Date("2025-01-27"),
            resourceId: "a"
          }
        ]}
        locale={frLocale}
        dateClick={handleDateClick}
      />
      {selectedDate && (
        <div className="mt-4 text-center">
          <p>
            Date sélectionnée : <strong>{selectedDate}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
