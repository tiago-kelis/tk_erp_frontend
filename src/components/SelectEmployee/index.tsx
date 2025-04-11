import { Employee } from "src/models/employee"
import { useState, useEffect } from "react";
import { useRequest } from "src/utils/request";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
    selectedEmployee: number | '',
    setSelectedEmployee: (employee_id: number) => void
}

const SelectEmployee = ({ selectedEmployee, setSelectedEmployee }: Props) => {
    const [employeesData, setEmployeesData] = useState<Employee[]>([])

    const { getEmployees } = useRequest();

    const handleGetEmployees = async () => {
        const response = await getEmployees();

        if (!response.detail) setEmployeesData(response.data.employees)
    }
    
    useEffect(() => {
        handleGetEmployees();
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel>Selecione um funcionário</InputLabel>
            <Select
                value={selectedEmployee}
                label="Selecione um funcionário"
                onChange={e => setSelectedEmployee(+e.target.value)}
            >
                {employeesData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name} - {item.email}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectEmployee;