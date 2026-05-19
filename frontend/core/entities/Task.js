export class Task {
    constructor({
        id = Date.now(),
        name,
        category,
        requiredRole,
        expectedDuration,
        urgency,
        isEnded = false,
    }) {
        this.#validate({
            name,
            category,
            expectedDuration,
            requiredRole,
            urgency,
        });
        this.id = id;
        this.name = name;
        this.category = category;
        this.requiredRole = requiredRole;
        this.expectedDuration = expectedDuration;
        this.urgency = urgency;
        this.isEnded = isEnded;
    }

    #validate({ name, category, requiredRole, expectedDuration, urgency }) {
        try {
            Number(urgency) ? urgency : Number(urgency);

            if (
                !Number.isInteger(urgency) &&
                !Number.isInteger(expectedDuration)
            ) {
                throw new Error("Invalid Data");
            }

            if (
                !name ||
                !category ||
                !requiredRole ||
                (urgency < 1 && urgency > 5) ||
                expectedDuration <= 0
            ) {
                throw new Error("Invalid data");
            }
        } catch (error) {
            throw new Error(`Task entity Error: ${error.message}`);
        }
    }

    statusColor() {
        return this.isEnded ? "green" : "orange";
    }

    urgencyColor() {
        switch (this.urgency) {
            case 1:
                return "green";
            case 2:
                return "yellow";
            case 3:
                return "orange";
            case 4:
                return "red";
            case 5:
                return "black";
        }
    }
}
