import { describe, it, expect, afterAll } from "vitest";
import { PgCustomerTrafficRepository } from "./PgCustomerTrafficRepository.js";
import { database } from "./Connection/ConnectionPostgree.js";

const repository = new PgCustomerTrafficRepository();
const customerTrafficTestData = {
    id: Date.now(), // ID único baseado em timestamp
    dayOfWeek: 3,
    hour: 14,
    customerVolume: 45,
};

let insertedRow = null;

describe("PgCustomerTrafficRepository", () => {
    it("deve inserir um registro de tráfego de cliente no banco de dados", async () => {
        const result = await repository.save(customerTrafficTestData);

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);
        expect(result.rows[0]).toMatchObject({
            id: customerTrafficTestData.id.toString(),
            hour: customerTrafficTestData.hour,
        });

        insertedRow = result.rows[0];
    });
});

afterAll(async () => {
    if (insertedRow) {
        await database.query('DELETE FROM "customer_traffic" WHERE id = $1', [
            customerTrafficTestData.id,
        ]);
    }
});
