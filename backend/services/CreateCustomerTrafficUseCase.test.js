import { beforeEach, describe, it, expect } from "vitest";
import { CreateCustomerTraffic } from "./CreateCustomerTraffic.js";
import CustomerTraffic from "../entities/performance/CustomerTraffic.js";
import { MkCustomerTraffic } from "../repositories/MkCutomerTraffic.js";

describe("CreateCustomerTrafficUseCase", () => {
    let data;
    let customerTrafficRepository = new MkCustomerTraffic();

    it("Não deveria retornar erro ao passar os parametros corretos", async () => {
        customerTrafficRepository.removeAll();
        data = {
            id: 1,
            dayOfWeek: 1,
            hour: 7,
            customerVolume: 10,
        };
        const createCustomerTraffic = new CreateCustomerTraffic(data);

        await expect(createCustomerTraffic.execute()).resolves.toBeUndefined();
    });

    it("Deveria retornar erro caso os parametros estiverem errados", async () => {
        customerTrafficRepository.removeAll();
        data = {
            id: 1,
            dayOfWeek: -2,
            hour: "w",
            customerVolume: 10,
        };

        const customerTrafficData = new CustomerTraffic(data);
        const createCustomerTraffic = new CreateCustomerTraffic(
            customerTrafficData,
        );

        await expect(createCustomerTraffic.execute()).rejects.toThrow(
            "Use Case Error: Invalid params",
        );
    });
});
