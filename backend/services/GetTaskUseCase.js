export class GetTaskUseCase {
    constructor(taskRepository) {
        this.repository = taskRepository;
    }

    /**
     * Lista as tasks do repositório
     * @returns {Promise<Array<Tasks>>||Error}
     */
    async execute() {
        try {
            const tasks = await this.repository.getAllData();
            if (tasks instanceof Error) throw new Error(tasks.message);
            return tasks;
        } catch (error) {
            throw new Error(`Error in execute get tasks -> ${error.message}`);
        }
    }
}
