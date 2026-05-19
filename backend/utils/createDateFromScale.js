export const createDateFromScale = (dayOfWeek, hour) => {
    const now = new Date();
    const today = now.getDay();

    const diff = dayOfWeek - today;

    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);
    targetDate.setHours(hour, 0, 0);

    return targetDate;
};
