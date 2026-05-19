export class ServiceSchedule {
    constructor({ id = Date.now(), day, data }) {
        this.#validate(day);
        this.id = id;
        this.day = day;
        this.data = data;
    }

    /**
     *
     * @param {number} day
     * @throws {Error} Lança um erro se o input dia for inválido
     */
    #validate(day) {
        if (day < 0 || day > 6 || !Number.isInteger(day)) {
            throw new Error("Invalid day input");
        }
    }
}
