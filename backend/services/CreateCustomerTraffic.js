import CustomerTraffic from "../entities/performance/CustomerTraffic.js";
import { PgCustomerTrafficRepository } from "../repositories/Postgree/PgCustomerTrafficRepository.js";

export class CreateCustomerTraffic {
    constructor({
        id,
        dayOfWeek,
        hour,
        customerVolume,
        customerTrafficRepository = new PgCustomerTrafficRepository(),
    }) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.customerVolume = customerVolume;

        this.repository = customerTrafficRepository;
    }

    isValid() {
        const dayOfWeekIsOk =
            Number.isInteger(this.dayOfWeek) &&
            this.dayOfWeek >= 0 &&
            this.dayOfWeek < 7;
        const hourIsOk =
            Number.isInteger(this.hour) && this.hour >= 7 && this.hour <= 23;
        const customerTrafficIsOk =
            Number.isInteger(this.customerVolume) &&
            this.customerVolume > 0 &&
            this.customerVolume < 10 ** 4;

        return dayOfWeekIsOk && hourIsOk && customerTrafficIsOk;
    }

    async execute() {
        try {
            if (!this.isValid()) throw new Error("Invalid params");
            console.log({
                id: this.id,
                dayOfWeek: this.dayOfWeek,
                hour: this.hour,
                customerVolume: this.customerVolume,
            });

            const customerTraffic = new CustomerTraffic({
                id: this.id,
                dayOfWeek: this.dayOfWeek,
                hour: this.hour,
                customerVolume: this.customerVolume,
            });

            const customerTrafficSaved =
                await this.repository.save(customerTraffic);

            if (customerTrafficSaved instanceof Error)
                throw new Error(customerTrafficSaved.message);
        } catch (error) {
            throw new Error(`Use Case Error: ${error.message}`);
        }
    }
}
