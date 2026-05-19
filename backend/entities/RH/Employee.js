/*
 * Entidade que representa o colaborador
 * O que ele é e o que ele faz
 */

class Employee {
    constructor({
        id,
        name,
        role,
        skills = [],
        weeklySchedule = [],
        isPharmacist = false,
        isWorking = false,
    }) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.skills = skills;
        this.weeklySchedule = weeklySchedule;
        this.isPharmacist = isPharmacist;
        this.isWorking = isWorking;

        this.createdAt = new Date();
        this.isActive = true;
    }

    /**
     * Verifica se o colaborador está dentro do horário de trabalho
     * @param {Date} currentTime
     * @returns {boolean}
     */

    isAvailableAt(currentTime) {
        const dayOfWeek = currentTime.getDay();
        const timeStr = currentTime.getHours();

        const scheduleToday = this.weeklySchedule.find(
            (s) => s.day === dayOfWeek,
        );

        if (scheduleToday === {}) return false;

        return timeStr >= scheduleToday.entry && timeStr <= scheduleToday.exit;
    }

    /**
     * Verifica se o cargo do colaborador pode realizar determinada tarefa
     * @param {string} requiredRole
     * @returns {boolean}
     */

    canPerformRole(requiredRole) {
        return this.role === requiredRole || this.role === "Manager";
    }
}

export default Employee;
