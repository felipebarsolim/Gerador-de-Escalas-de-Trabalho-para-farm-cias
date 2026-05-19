import { APIcustomerTrafficRepository } from "../../infra/repositories/APIcustomerTrafficRepository.js";
import { CustomerTraffic } from "../entities/CustomerTraffic.js";

export class CustomerTrafficService {
    constructor() {
        this.repository = new APIcustomerTrafficRepository();
    }

    /**
     * * Instancia a entidade Customer Traffic de acordo com os dados de input
     * @param {Array<Object>} customerTraffic
     * @returns {Promise<Array<CustomerTraffic>>} - Retorna uma Promise de um Array de Customer Traffic
     * @throws {Error} - Retorna erro em caso de dados inválidos ou problema na requisição
     */
    async create(customerTraffic) {
        try {
            customerTraffic = Array.isArray(customerTraffic)
                ? customerTraffic
                : [customerTraffic];

            const data = customerTraffic.map((c) => {
                return new CustomerTraffic({
                    day: c.day,
                    hour: c.hour,
                    customerVolume: c.customerVolume,
                });
            });

            const response = await this.repository.create(data);

            return response;
        } catch (error) {
            console.error(
                `Error in create customer traffic service -> ${error.message}`,
            );
        }
    }

    /**
     * * Envia uma requisição tipo GET para buscar os customer Traffic
     * @returns {Array<CustomerTraffic>} Retorna um Array de customer Traffic
     * @throws {Error} Lança um erro caso a requisição falhe
     */
    async getAllData() {
        try {
            const response = await this.repository.listAll();
            if (response instanceof Error) throw new Error(response.message);
            return response;
        } catch (error) {
            console.error(
                `Error in create customer traffic service -> ${error.message}`,
            );
        }
    }
}
