import { PgEmployeeRepository } from "../repositories/Postgree/PgEmployeeRepository.js";
import { CreateEmployeeUseCase } from "../services/CreateEmployeeUseCase.js";
import { GetEmployeesUseCase } from "../services/GetEmployeesUseCase.js";

export class EmployeeController {
    constructor() {
        this.repository = new PgEmployeeRepository();
    }

    async getAllData(req, res) {
        try {
            const getDataFromEmployeeRepository = new GetEmployeesUseCase(
                this.repository,
            );
            const data = await getDataFromEmployeeRepository.execute();
            if (data instanceof Error) throw new Error(data.message);
            res.status(200).json({
                sucess: "OK",
                payload: data,
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json("Internal Error");
        }
    }

    async create(req, res) {
        try {
            if (Object.keys(req.body).length === 0)
                throw new Error("Empty data");
            let { id, name, role, skills, isPharmacist } = req.body;

            skills = Array.isArray(skills) ? skills : [skills];

            const createEmployee = new CreateEmployeeUseCase({
                id,
                name,
                role,
                skills,
                isPharmacist,
                employeeRepository: this.repository,
            });

            const result = await createEmployee.execute();

            if (result !== true) throw new Error(result);

            res.status(200).json({
                success: "OK",
            });
        } catch (error) {
            console.error(error.message);
            res.status(200).json("Internal Error");
        }
    }
}
