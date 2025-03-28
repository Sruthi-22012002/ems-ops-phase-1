import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'https://springboot-backend-application.internal.victoriousplant-61a9e6eb.centralindia.azurecontainerapps.io/api/vl/employees';

class EmployeeService{

    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_REST_API_URL, employee)
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId);
    }

    updateEmployee(employeeId, employee){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' +employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId);
    }
}

export default new EmployeeService();
