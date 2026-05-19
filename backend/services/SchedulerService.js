import CustomerTraffic from "../entities/performance/CustomerTraffic.js";
import { ServiceSchedule } from "../entities/performance/ServiceSchedule.js";
import Task from "../entities/performance/Task.js";
import Employee from "../entities/RH/Employee.js";
import { createDateFromScale } from "../utils/createDateFromScale.js";

export class ScheduleService {
    /**
     * Gera a escala de tarefas
     * @param {number} satisfactionScore
     * @param {Array<CustomerTraffic>} trafficData
     */
    constructor(satisfactionScore, trafficData, scheduleServiceRepository) {
        this.satisfactionScore = satisfactionScore;
        this.trafficData = trafficData;
        this.onGoingTasks = [];
        this.schedule = [];
        this.repository = scheduleServiceRepository;
    }

    /**
     *Atualiza o status de uma tarefa
     * @param {Date} currentTime
     */
    updateEmployeeStatus(currentTime) {
        this.onGoingTasks.forEach((taskOnGoing) => {
            if (currentTime >= taskOnGoing.endAt) {
                taskOnGoing.employee.isWorking = false;
                taskOnGoing.task.isEnded = true;
                taskOnGoing.task.onGoing = false;
            } else {
                taskOnGoing.task.onGoing = true;
            }
        });

        this.onGoingTasks = this.onGoingTasks.filter((task) => {
            return currentTime < task.endAt;
        });
    }

    /**
     * Verifica se o encantômetro está acima de 90
     * @returns {boolean}
     */
    canExecuteBacklog() {
        return this.satisfactionScore >= 90;
    }

    /**
     * Verifica se é horario de pico
     * @param {number} day
     * @param {number} hour
     * @returns {boolean}
     */
    isPeakHour(day, hour) {
        const traffic = this.trafficData.find(
            (t) => t.dayOfWeek === day && t.hour === hour,
        );
        return traffic ? traffic.customerVolume >= 60 : false;
    }

    /**
     * Interrompe uma tarefa
     * @param {Object} stopTask
     */

    updateEmployeeAndTask(stopTask) {
        stopTask.employee.isWorking = false;
        stopTask.task.onGoing = false;
        stopTask.endAt += 1;

        const index = this.onGoingTasks.indexOf(stopTask);
        if (index > -1) {
            this.onGoingTasks.splice(index, 1);
        }
    }

    /**
     *
     * @param {Array<Employee>} employees
     * @param {Array<Task>} tasks
     * @param {number} day
     * @param {number} hour
     * @returns {boolean | Object}
     */
    async generateDailySchedule(employees, tasks, day) {
        try {
            const schedule = [];
            for (let hour = 7; hour <= 23; hour++) {
                const currentTime = createDateFromScale(day, hour);

                this.updateEmployeeStatus(hour);

                if (!this.canExecuteBacklog()) {
                    continue;
                }

                /**
                 * Verifica quais funcionários estão disponíveis no horário
                 */
                const availableEmployeeTotal = employees
                    .filter((e) => e.isActive)
                    .filter((emp) => emp.isAvailableAt(currentTime));

                /**
                 * Sorteia por nível de urgência
                 */
                const sortedTasks = tasks
                    .filter((t) => t.isEnded === false && t.onGoing === false)
                    .sort((a, b) => b.urgency - a.urgency);

                /**
                 * Procura quais funcionários estão disponíveis no horário e não estão trabalhando
                 */
                const availableEmployee = availableEmployeeTotal.filter(
                    (emp) => emp.isWorking === false,
                );

                /**
                 * Se tiver 3 ou menos funcionários disponíveis em horário de pico, Alerta
                 */
                if (
                    this.isPeakHour(day, hour) ||
                    availableEmployee.length <= 3
                ) {
                    const workingEmployee = employees
                        .filter((e) => e.isActive)
                        .filter((emp) => emp.isAvailableAt(currentTime))
                        .filter((emp) => emp.isWorking === true);

                    workingEmployee.forEach((emp) => {
                        const employeeWorking = this.onGoingTasks.findIndex(
                            (e) => emp.name === e.employee.name,
                        );
                        if (employeeWorking === -1) return;
                        this.updateEmployeeAndTask(
                            this.onGoingTasks[employeeWorking],
                        );
                    });
                    continue;
                }

                /**
                 * Se tiver 3 funcionários disponíveis no horário, não faz nada além de atender
                 */
                if (availableEmployee.length <= 3) continue;

                /**
                 * Horario de intervalos
                 */
                if ((hour >= 13 && hour < 14) || (hour >= 16 && hour < 17))
                    continue;

                for (const emp of availableEmployee) {
                    /**
                     * Calcula o número de funcionários trabalhando
                     */
                    const availableEmployeeNumber = employees.filter(
                        (e) =>
                            e.isActive &&
                            e.isAvailableAt(currentTime) &&
                            !e.isWorking,
                    ).length;

                    /**
                     * Se tiver 1 funcionário trabalhando e sobrar menos de 3 atendendo, retorne
                     */
                    if (availableEmployeeNumber <= 3) {
                        break;
                    }

                    /**
                     * Encontra uma task que o emp atual pode fazer
                     */
                    const taskIndex = sortedTasks.findIndex((t) =>
                        emp.canPerformRole(t.requiredRole),
                    );

                    /**
                     * Delega a tarefa ao emp atual se ele poder fazer
                     */
                    if (taskIndex !== -1) {
                        const taskToDo = sortedTasks[taskIndex];

                        this.schedule.push({
                            name: emp.name,
                            role: emp.role,
                            hour: hour,
                            taskName: taskToDo.name,
                            taskDuration: taskToDo.expectedDuration,
                            endAt: hour + taskToDo.expectedDuration,
                        });
                        emp.isWorking = true;
                        this.onGoingTasks.push({
                            employee: emp,
                            task: taskToDo,
                            endAt: hour + taskToDo.expectedDuration,
                        });

                        sortedTasks.splice(taskIndex, 1);
                    }
                }

                if (this.schedule.length === 0) continue;
            }
            const id = Date.now();

            const serviceSchedule = new ServiceSchedule({
                id,
                day,
                data: this.schedule,
            });

            const res = await this.repository.save(serviceSchedule);

            if (res instanceof Error) throw new Error(res.message);
        } catch (error) {
            throw new Error(`Schedule Service Error: ${error.message}`);
        }
    }
}
