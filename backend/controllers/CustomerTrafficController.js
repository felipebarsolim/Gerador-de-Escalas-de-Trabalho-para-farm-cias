import { PgCustomerTrafficRepository } from "../repositories/Postgree/PgCustomerTrafficRepository.js";
import { CreateCustomerTraffic } from "../services/CreateCustomerTraffic.js";
import { GetCustomerTrafficUseCase } from "../services/GetCustomerTrafficUseCase.js";

export class CustomerTrafficController {
    constructor() {
        this.repository = new PgCustomerTrafficRepository();
    }

    async create(req, res) {
        try {
            const customerTraffic = Array.isArray(customerTraffic)
                ? customerTraffic
                : [customerTraffic];

            for (item of customerTraffic) {
                const { id, dayOfWeek, hour, customerVolume } = item;

                const createCustomerTraffic = new CreateCustomerTraffic({
                    id,
                    dayOfWeek,
                    hour,
                    customerVolume,
                    customerTrafficRepository: this.repository,
                });

                const result = await createCustomerTraffic.execute();
                console.log(result);

                if (result instanceof Error) throw new Error(result.message);
            }

            res.status(200).json({ success: "OK" });
        } catch (error) {
            console.error(
                `Error in customer traffic controller -> ${error.message}`,
            );
            res.status(500).json("Internal Error");
        }
    }

    async getAllData(req, res) {
        try {
            const customerTraffics = new GetCustomerTrafficUseCase(
                this.repository,
            );

            const payload = await customerTraffics.execute();

            if (payload instanceof Error) throw new Error(payload.message);

            res.status(200).json({
                success: true,
                payload,
            });
        } catch (error) {
            console.error(
                `Error in customer traffic controller -> ${error.message}`,
            );
            res.status(500).json("Internal Error");
        }
    }
}
