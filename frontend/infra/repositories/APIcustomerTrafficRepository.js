import { CustomerTraffic } from "../../core/entities/CustomerTraffic.js";
import { APIendpoint } from "../../shared/constants/APIendpoints.js";
import { client } from "../api/client.js";

export class APIcustomerTrafficRepository {
    constructor() {
        this.client = client;
    }

    /**
     * Realiza a persistência de um novo registro de tráfego de clientes.
     * * @param {Array<CustomerTraffic>} customerTraffic - Dados do volume de clientes.
     * @returns {Promise<Object>} Promessa que resolve com o JSON da resposta.
     * @throws {Error} Lança um erro caso a requisição falhe ou os dados sejam inválidos.
     */
    async create(customerTraffic) {
        try {
            customerTraffic = Array.isArray(customerTraffic)
                ? customerTraffic
                : [customerTraffic];

            const response = await this.client(
                APIendpoint.createCustomerTraffic,
                {
                    method: "POST",
                    body: JSON.stringify(customerTraffic),
                },
            );

            if (response instanceof Error)
                throw new Error(response.message || "Unknown error");

            return response;
        } catch (error) {
            throw new Error(
                `Error in customer traffic repository -> ${error.message}`,
            );
        }
    }

    /**
     * Retorna um array de customer Traffic
     * @returns {Promise<Array<CustomerTraffic>} - Promessa que resolve com o JSON da resposta.
     * @throws {Error} - Lança um erro caso a requisição falhe ou os dados estejam inválidos
     */
    async listAll() {
        try {
            const response = await this.client(APIendpoint.getCustomerTraffic);

            if (response instanceof Error)
                throw new Error(response.message || "Unknown error");

            if (
                !Array.isArray(response) &&
                response &&
                response.success === false
            )
                throw new Error(
                    response.message || "Error fetching customer traffic",
                );

            let payload;
            if (Array.isArray(response)) {
                payload = response;
            } else if (
                response &&
                Object.prototype.hasOwnProperty.call(response, "payload")
            ) {
                payload = response.payload;
            } else {
                payload = response;
            }

            payload = Array.isArray(payload) ? payload : [payload];

            if (payload.length === 0) return payload;

            return payload.map((c) => {
                return new CustomerTraffic({
                    id: c.id,
                    day: c.dayOfWeek,
                    hour: c.hour,
                    customerVolume: c.customerVolume,
                });
            });
        } catch (error) {
            throw new Error(
                `Error in customer traffic repository -> ${error.message}`,
            );
        }
    }
}
