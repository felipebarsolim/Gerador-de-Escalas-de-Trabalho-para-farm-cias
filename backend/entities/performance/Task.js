class Task {
    static mainCategory = ["Execução", "Financeiro", "Treinamento", "Técnica"];
    static mainUrgency = [1, 2, 3, 4, 5];

    constructor({
        id,
        name,
        category,
        expectedDuration,
        requiredRole,
        urgency,
        isEnded,
        onGoing,
    }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.expectedDuration = expectedDuration;
        this.requiredRole = requiredRole;
        this.urgency = urgency;
        this.isEnded = false;
        this.onGoing = false;
    }
}

export default Task;
