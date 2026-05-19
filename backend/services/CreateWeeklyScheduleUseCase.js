import WeeklySchedule from "../entities/RH/WeeklySchadule.js";
import { PgEmployeeRepository } from "../repositories/Postgree/PgEmployeeRepository.js";

export class CreateWeeklyScheduleUseCase {
    constructor({
        id,
        mounth,
        inicialDay,
        daysOfWeek = {},

        CreateWeeklyScheduleRepository,
    }) {
        this.id = id;
        this.mounth = mounth;
        this.inicialDay = inicialDay;
        this.daysOfWeek = daysOfWeek;

        this.repository = CreateWeeklyScheduleRepository;
        this.employeeRepository = new PgEmployeeRepository();
    }

    async execute() {
        try {
            const weeklySchedule = new WeeklySchedule({
                id: this.id,
                mounth: this.mounth,
                inicialDay: this.inicialDay,
                daysOfWeek: this.daysOfWeek,
            });

            const sync = await this.syncSchedule();
            if (sync instanceof Error) throw new Error(sync.message);
            else {
                const res = await this.repository.save(weeklySchedule);
                if (res instanceof Error)
                    throw new Error("Save Error -> ", res.message);
            }
        } catch (error) {
            throw new Error(
                `Weekly Schedule Use Case Error -> ${error.message}`,
            );
        }
    }

    async syncSchedule() {
        try {
            const daysOfWeek = this.daysOfWeek;
            const updatedEmployees = [];
            for (const employee of Object.keys(daysOfWeek)) {
                const schedule = daysOfWeek[employee];
                const res = await this.employeeRepository.update(
                    employee,
                    "weekly_schedule",
                    JSON.stringify(schedule),
                );
                if (res instanceof Error) throw new Error(res.message);

                updatedEmployees.push(res);
            }

            return updatedEmployees;
        } catch (error) {
            throw new Error(`Sync Schedule Error -> ${error.message}`);
        }
    }
}
