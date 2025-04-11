import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import TasksTable from "src/components/TasksTable";
import {PermissionMiddleWares } from "src/middlewares/PermissionMiddleWare";
import { Task } from "src/models/task";
import { useRequest } from "src/utils/request";

const Tasks = () => {
    const [requestLoading, setRequestLoading] = useState(true)
    const [tasksData, setTasksData] = useState<Task[]>([])

    const { getTasks } = useRequest();

    const handleGetTasks = async () => {
        const response = await getTasks();

        if (!response.detail) {
            setTasksData(response.data.tasks)
            setRequestLoading(false)
        }
    }

    useEffect(() => {
        handleGetTasks()
    }, [])

    return (
        <PermissionMiddleWares codeName="view_task">
            <Helmet>
                <title>Tarefas</title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle
                    heading="Tarefas"
                    subHeading="Consulte as tarefas dos funcionários e execute ações em cada uma delas"
                />
            </PageTitleWrapper>

            <Container maxWidth="xl" sx={{
                marginX: requestLoading ? '-4%' : 0,
                transition: 'all .5s'
            }}>
                <TasksTable
                    tasksList={tasksData}
                    refreshList={handleGetTasks}
                />
            </Container>
        </PermissionMiddleWares>
    )
}

export default Tasks;