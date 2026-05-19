export class GetEmployeesUseCase {
    constructor(employeeRepository) {
        this.repository = employeeRepository;
    }

    async execute() {
        try {
            const employees = await this.repository.getAllData();
            if (employees instanceof Error) throw new Error(employees.message);
            return employees;
        } catch (error) {
            throw new Error(`Error get Employees -> ${error.message}`);
        }
    }
}
