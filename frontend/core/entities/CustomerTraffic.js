import { z } from "zod";

export class CustomerTraffic {
    /**
     * Instancia e valida a entidade de tráfego de clientes.
     * * @param {Object} data - Objeto de configuração da entidade.
     * @param {number} [data.id] - Identificador único (opcional na criação).
     * @param {number} data.day - Dia do registro (1-31).
     * @param {number} data.hour - Hora do registro (0-23).
     * @param {number} data.customerVolume - Volume de clientes medido.
     * @returns {CustomerTraffic} Uma nova instância de CustomerTraffic.
     * @throws {Error} Caso a validação do Zod falhe.
     */
    constructor({ id = Date.now(), day, hour, customerVolume }) {
        this.#validate({ day, hour, customerVolume });
        this.id = id;
        this.day = day;
        this.hour = hour;
        this.customerVolume = customerVolume;
    }

    /**
     * Valida as regras de negócio do customer traffic
     * @param {{day: number, hour: number, customerVolume: number}} data
     * @throws {{'Invalid input data'} || void}
     */
    #validate(data) {
        const customerTrafficSchema = z.object({
            day: z.number().int().min(0).max(6),
            hour: z.number().int().min(7).max(23),
            customerVolume: z.number().int().min(0),
        });

        const isValid = customerTrafficSchema.safeParse(data);

        if (!isValid.success)
            throw new Error("Invalid input data Entitie Customer Traffic");
    }

    /**
     * Retorna a cor relacionada ao nível de clientes no horário
     * @returns {string}
     */
    peakHourColor() {
        switch (true) {
            case this.customerVolume > 35 && this.customerVolume < 45:
                return "yellow";
            case this.customerVolume > 45 && this.customerVolume < 60:
                return "orange";
            case this.customerVolume > 60:
                return "red";
        }
    }
}
