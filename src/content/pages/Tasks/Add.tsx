import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { LinearProgress, Snackbar, TextField, Stack, Container, Button } from '@mui/material';
import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import { PermissionMiddleWares } from 'src/middlewares/PermissionMiddleWare'
import { useDate } from 'src/utils/formatDate'
import { useRequest } from 'src/utils/request'
import SelectEmployee from 'src/components/SelectEmployee';
import SelectTaskStatus from 'src/components/SelectTaskStatus/SelectTaskStatus/index';

const AddTask = () => {
    const [requestLoading, setRequestLoading] = useState(false)
    const [infoMessage, setInfoMessage] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [dateTimeInput, setDateTimeInput] = useState('')
    const [selectedStatus, setSelectedStatus] = useState(1)
    const [selectedEmployee, setSelectedEmployee] = useState<number | ''>('')

    const navigate = useNavigate()

    const { formatDateForAPI } = useDate()
    const { addTask } = useRequest()

    const handleAdd = async () => {
        const [title, description, employee_id, status_id] = [titleInput, descriptionInput, selectedEmployee, selectedStatus]
        const due_date = dateTimeInput ? formatDateForAPI(dateTimeInput) : null

        if (!title || !employee_id) {
            setInfoMessage('Preencha todos os campos')
            return;
        }

        setRequestLoading(true)
        const response = await addTask({ title, description, due_date, employee_id, status_id })
        setRequestLoading(false)

        if (response.detail) {
            setInfoMessage(response.detail)
            return;
        }

        navigate('/tasks')
    }

    return (
        <PermissionMiddleWares codeName='add_task'>
            <Helmet>
                <title>Adicionar uma Tarefa</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{ height: 2 }} color='primary' />}

            <PageTitleWrapper>
                <PageTitle
                    heading='Adicionar uma Tarefa'
                    subHeading='Adicione uma tarefa e defina título, descrição, prazo máximo, funcionário, status e etc'
                />
            </PageTitleWrapper>

            <Snackbar
                open={infoMessage != ''}
                onClose={() => setInfoMessage('')}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={infoMessage}
            />


            <Container maxWidth='lg'>
                <Stack sx={{padding: 2, gap: 3, marginLeft: 18, width: 800}}>
                    <TextField
                        fullWidth
                        label="Título *"
                        value={titleInput}
                        onChange={e => setTitleInput(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Descrição"
                        value={descriptionInput}
                        onChange={e => setDescriptionInput(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        type='datetime-local'
                        value={dateTimeInput}
                        onChange={e => setDateTimeInput(e.target.value)}
                    />

                    <SelectEmployee
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                    />

                    <SelectTaskStatus
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                    />

                    <Button
                        variant='outlined'
                        sx={{ width: 90, mt: 3.5, marginBottom: 5 }}
                        onClick={requestLoading ? () => null : handleAdd}
                        disabled={requestLoading}
                    >
                        Criar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleWares>
    )

}

export default AddTask;