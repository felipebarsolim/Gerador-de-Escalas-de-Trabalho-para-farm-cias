export class Employee {
    /**
     * Cria a entidade Employee
     * @param {Object} employeeData
     */
    constructor({
        id = Date.now(),
        name,
        role,
        skills = [],
        weeklySchedule = [],
        isActive = true,
        isWorking = false,
    }) {
        this.#validate({ name, role });
        this.id = id;
        this.name = name;
        this.role = role;
        this.skills = skills;
        this.weeklySchedule = weeklySchedule;
        this.isActive = isActive;
        this.isWorking = isWorking;
    }

    #validate(data) {
        if (!data.name || data.name.length < 3) {
            throw new Error(
                "O nome do funcionário deve ter pelo menos 3 caracteres",
            );
        }
        if (!data.role || data.role.length < 3) {
            throw new Error(
                "O cargo do funcionário deve conter pelo menos 3 caracteres",
            );
        }
    }
    /**
     * Retorna o nome formatado do funcionário
     * @returns {string}
     */
    get FormatedName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
     * retorna cores para status funcionário ativo e trabalhando
     * @returns {string}
     */
    get statusColor() {
        if (!this.isActive) return "gray";
        return this.isWorking ? "orange" : "green";
    }
}
