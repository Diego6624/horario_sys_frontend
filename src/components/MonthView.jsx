const MonthView = ({ date, schedules }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // domingo=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - startDay + 1;
    return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
  });

  return (
    <div className="grid grid-cols-7 border">
      {["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"].map((d, i) => (
        <div key={i} className="border p-2 font-bold text-center">{d}</div>
      ))}
      {cells.map((day, i) => (
        <div key={`cell-${i}`} className="border h-24 p-1 relative">
          {day && (
            <>
              <div className="text-xs font-bold">{day}</div>
              <div className="space-y-1">
                {schedules
                  .filter((s) => {
                    const d = new Date(s.date);
                    return (
                      d.getFullYear() === year &&
                      d.getMonth() === month &&
                      d.getDate() === day
                    );
                  })
                  .map((s) => (
                    <div key={s.id} className="bg-blue-200 rounded p-1 text-xs shadow">
                      {s.course} ({s.startTime})
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
