export function ScheduleRow({ employee, schedules }) {
    const currentSchedule = schedules?.[0] || {
        day: "-",
        entry: "-",
        exit: "-",
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {employee}
            </td>
            <td className="px-6 py-4 text-gray-600">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">
                    {currentSchedule.day}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                {currentSchedule.entry !== "-"
                    ? `${currentSchedule.entry}:00`
                    : "-"}
            </td>
            <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                {currentSchedule.exit !== "-"
                    ? `${currentSchedule.exit}:00h`
                    : "-"}
            </td>
        </tr>
    );
}
