import { ScheduleService } from "../services/SchedulerService.js";
import { GetServiceScheduleUseCase } from "../services/GetServiceScheduleUseCase.js";
import { PgEmployeeRepository } from "../repositories/Postgree/PgEmployeeRepository.js";
import { PgServiceSchedule } from "../repositories/Postgree/PgServiceSchedule.js";
import { PgTaskRepository } from "../repositories/Postgree/PgTaskRepository.js";
import { PgCustomerTrafficRepository } from "../repositories/Postgree/PgCustomerTrafficRepository.js";

export class ServiceSchaduleController {
    constructor() {
        this.employeeRepository = new PgEmployeeRepository();
        this.schaduleRepository = new PgServiceSchedule();
        this.taskRepository = new PgTaskRepository();
        this.customerTrafficRepository = new PgCustomerTrafficRepository();
    }

    async getAllData(req, res) {
        try {
            const getServiceSchedule = new GetServiceScheduleUseCase(
                this.schaduleRepository,
            );
            const payload = await getServiceSchedule.execute();

            if (payload instanceof Error) throw new Error(payload.message);

            res.status(200).json({
                success: true,
                payload,
            });
        } catch (error) {
            console.error(
                `Service Schedule Controller Error -> ${error.message}`,
            );
            res.status(500).json("Internal Error");
        }
    }

    async create(req, res) {
        try {
            console.log("Aqui");
            const { day, satisfactionScore } = req.body;

            const employees = await this.employeeRepository.getAllData();
            const tasks = await this.taskRepository.getAllData();
            const customerTraffic =
                await this.customerTrafficRepository.getAllData();

            const newSchedule = new ScheduleService(
                satisfactionScore,
                customerTraffic,
                this.schaduleRepository,
            );

            const result = await newSchedule.generateDailySchedule(
                employees,
                tasks,
                day,
            );

            if (result instanceof Error) throw new Error(result.message);

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(
                `Service Schedule Controller Error -> ${error.message}`,
            );
            res.status(500).json("Internal Error");
        }
    }
}
