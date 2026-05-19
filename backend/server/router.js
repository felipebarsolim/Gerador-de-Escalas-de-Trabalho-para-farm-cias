import { CustomerTrafficController } from "../controllers/CustomerTrafficController.js";
import { EmployeeController } from "../controllers/EmployeeController.js";
import { ServiceSchaduleController } from "../controllers/ServiceSchaduleController.js";
import { TaskController } from "../controllers/TaskController.js";
import express from "express";
import { WeeklyScheduleController } from "../controllers/WeeklySchaduleController.js";
import { GetServiceScheduleUseCase } from "../services/GetServiceScheduleUseCase.js";

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/getServiceSchedule", async (req, res) => {
    const serviceScheduleController = new ServiceSchaduleController();
    await serviceScheduleController.getAllData(req, res);
});

router.get("/getEmployees", async (req, res) => {
    const employeeController = new EmployeeController();
    await employeeController.getAllData(req, res);
});

router.get("/getCustomerTraffic", async (req, res) => {
    const customerTraffic = new CustomerTrafficController();
    await customerTraffic.getAllData(req, res);
});

router.get("/getTasks", async (req, res) => {
    const taskController = new TaskController();
    await taskController.getAllData(req, res);
});

router.get("/getWeeklySchedule", async (req, res) => {
    const weeklySchaduleController = new WeeklyScheduleController();
    await weeklySchaduleController.getAllData(req, res);
});

router.post("/createServiceSchedule", async (req, res) => {
    const serviceScheduleController = new ServiceSchaduleController();
    await serviceScheduleController.create(req, res);
});

router.post("/createTasks", async (req, res) => {
    const taskController = new TaskController();
    await taskController.create(req, res);
});

router.post("/createEmployee", async (req, res) => {
    const employeeController = new EmployeeController();
    await employeeController.create(req, res);
});

router.post("/createCustomerTraffic", async (req, res) => {
    const customerTrafficController = new CustomerTrafficController();
    await customerTrafficController.create(req, res);
});

router.post("/createWeeklySchedule", async (req, res) => {
    const weeklyScheduleController = new WeeklyScheduleController();
    await weeklyScheduleController.create(req, res);
});

export default router;
