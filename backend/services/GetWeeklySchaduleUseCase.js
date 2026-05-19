export class GetWeeklyScheduleUseCase {
    constructor(weeklyScheduleRepository) {
        this.repository = weeklyScheduleRepository;
    }

    async execute() {
        try {
            const response = await this.repository.getAllData();
            if (response instanceof Error) throw new Error(response.message);
            return response;
        } catch (error) {
            throw new Error(
                `Error in execute Get weekly schedule use Case -> ${error.message}`,
            );
        }
    }
}
