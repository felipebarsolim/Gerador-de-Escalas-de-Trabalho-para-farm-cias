/**
 * Escala semanal de trabalho dos funcionários
 */

class WeeklySchedule {
    constructor({ id, mounth, inicialDay, daysOfWeek = {} }) {
        this.id = id;
        this.mounth = mounth;
        this.inicialDay = inicialDay;
        this.daysOfWeek = daysOfWeek;

        this.endDay = this.inicialDay + 6;
    }
}

export default WeeklySchedule;
