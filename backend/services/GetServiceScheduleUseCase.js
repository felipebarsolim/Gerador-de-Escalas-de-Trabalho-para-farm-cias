export class GetServiceScheduleUseCase {
    constructor(scheduleServiceRepository) {
        this.respository = scheduleServiceRepository;
    }

    async execute() {
        try {
            const schedule = await this.respository.getAllData();

            if (schedule instanceof Error) throw new Error(schedule.message);
            return schedule;
        } catch (error) {
            throw new Error(
                `Get Service Schedule Use Case Error  -> ${error.message}`,
            );
        }
    }
}
