export class GetCustomerTrafficUseCase {
    constructor(customerTrafficRepository) {
        this.repository = customerTrafficRepository;
    }

    /**
     * * Busca os dados de customer traffic no banco de dados
     * @returns {Array<CustomerTraffic>} - Retorna um Array de Customer Traffic
     * @throws {Error} - Lança erro caso requisição ao banco de dados falhe
     */
    async execute() {
        try {
            const data = await this.repository.getAllData();
            if (data instanceof Error) throw new Error(data.message);
            return data;
        } catch (error) {
            throw new Error(
                `Error in get customer Traffic use Case -> ${error.message}`,
            );
        }
    }
}
