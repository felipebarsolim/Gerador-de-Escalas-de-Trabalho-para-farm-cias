import Task from "../entities/performance/Task.js";

export class CreateTaskUseCase {
    static mainCategory = ["execucao", "financeiro", "treinamento", "tecnico"];

    /**
     * Cria a task, aplica as regras de negócio e salva no repositorio
     * @param {Object<Task>} Task
     */
    constructor({
        id,
        name,
        category,
        expectedDuration,
        requiredRole,
        urgency,
        repository,
    }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.expectedDuration = expectedDuration;
        this.requiredRole = requiredRole;
        this.urgency = urgency;

        this.repository = repository;
    }

    isInteger() {
        return (
            Number.isInteger(this.id) &&
            typeof this.expectedDuration === "number" &&
            Number.isInteger(this.urgency)
        );
    }

    isValid() {
        const categoryIsOk = CreateTaskUseCase.mainCategory.includes(
            this.category,
        );
        const expectedDurationIsOk = this.expectedDuration > 0;
        const urgencyIsOk = this.urgency > 0 && this.urgency < 6;

        return (
            categoryIsOk &&
            expectedDurationIsOk &&
            urgencyIsOk &&
            this.isInteger()
        );
    }

    async execute() {
        try {
            if (this.isValid() === false) {
                throw new Error("Error in task params");
            }
            const task = new Task({
                id: this.id,
                name: this.name,
                category: this.category,
                requiredRole: this.requiredRole,
                expectedDuration: this.expectedDuration,
                urgency: this.urgency,
            });

            const saved = await this.repository.save(task);

            if (saved instanceof Error)
                throw new Error("Error to save in database");

            return true;
        } catch (error) {
            throw new Error(`Error Use Case: ${error.message}`);
        }
    }
}
