import { object, z } from "zod";

export class WeeklySchedule {
    constructor({ id = Date.now(), mounth, inicialDay, daysOfWeek = {} }) {
        this.#validate({ mounth, inicialDay, daysOfWeek });
        this.id = id;
        this.mounth = mounth;
        this.inicialDay = inicialDay;
        this.daysOfWeek = daysOfWeek;
    }

    #validate(data) {
        try {
            if (
                !data ||
                Object.keys(data).length === 0 ||
                Object.keys(data.daysOfWeek).length === 0
            )
                throw new Error("Empty data in weekly schadule");

            const weeklyScheduleSchema = z.object({
                mounth: z.number().int().min(1).max(12),
                incialDay: z.number().int().min(1).max(31),
            });
        } catch (error) {
            throw new Error(
                `Error in create Weekly Schadule: ${error.message}`,
            );
        }
    }

    /**
     * Retorna a escala de trabalho de um funcionário específico
     * @param {string} employeeName
     * @returns {Array<Object>}
     */
    getdaysOfWeekByName(employeeName) {
        return this.daysOfWeek[employeeName];
    }

    /**
     * Retorna a Escala de trabalho Formatada
     * @returns {{employee: string, schedules: Array<Object>}}
     */
    getFormattedSchedule() {
        const dayNames = [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
        ];

        return Object.entries(this.daysOfWeek).map(
            ([employeeName, schedules]) => {
                const formattedSchedules = schedules.map((schedule) => {
                    return {
                        ...schedule,
                        day: dayNames[schedule.day] || schedule.day,
                    };
                });
                return {
                    employee: employeeName,
                    schedules: formattedSchedules,
                };
            },
        );
    }
}
