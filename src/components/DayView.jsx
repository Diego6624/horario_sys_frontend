import React from "react";

const DayView = ({ date, schedules }) => {
  const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8:00 - 20:00

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        {date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
      </h3>
      <div className="grid grid-cols-[80px_1fr] border">
        {hours.map((h) => (
          <React.Fragment key={h}>
            <div className="border p-2">{h}:00</div>
            <div className="relative border h-16">
              {schedules
                .filter((s) => {
                  const d = new Date(s.date);
                  return (
                    d.getFullYear() === date.getFullYear() &&
                    d.getMonth() === date.getMonth() &&
                    d.getDate() === date.getDate() &&
                    parseInt(s.startTime.split(":")[0]) === h
                  );
                })
                .map((s) => (
                  <div
                    key={s.id}
                    className="absolute inset-x-1 top-1 rounded p-1 text-xs shadow bg-blue-200"
                  >
                    <b>{s.course}</b><br />
                    {s.teacher}<br />
                    {s.startTime} - {s.endTime}
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DayView;
