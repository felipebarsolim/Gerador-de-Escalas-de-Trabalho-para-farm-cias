import { useState, useEffect } from "react";
import { WeeklyScheduleService } from "../../core/services/WeeklyScheduleService.js";

export function useWeeklySchedule() {
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchSchedules() {
        try {
            setLoading(true);
            setError(null);

            const service = new WeeklyScheduleService();
            const schedules = await service.getAllData();

            if (schedules && schedules.length > 0) {
                const formatted = schedules[0].getFormattedSchedule();
                setScheduleData(formatted);
            } else {
                setScheduleData([]);
            }
        } catch (error) {
            console.error(`Error in custom hook: ${error.message}`);
            setError(error.message || "Unknown Error in load schedules");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSchedules();
    }, []);

    return {
        scheduleData,
        loading,
        error,
        refetch: fetchSchedules,
    };
}
