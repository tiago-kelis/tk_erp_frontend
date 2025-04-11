import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleWares } from "src/middlewares/PermissionMiddleWare"
import { PermissionDetail } from "src/models/permission";
import { useRequest } from "src/utils/request";
import PermissionList from "src/components/PermissionList";


const AddGroup = () => {

    const [requestLoading, setRequestLoading] = useState(true);

    const [infoMessage, setInfoMessage] = useState("");
    const [nameInput, setNameInput] = useState("");

    const [permissionsData, setPermissionData] = useState<PermissionDetail[]>([]);
    const [selectedPermissions, setSeletedPermissions] = useState<number[]>([]);
    const {getPermissions, addGroup} = useRequest();

    const navigate = useNavigate();

    const handleGetPermissions = async () => {
        const response = await getPermissions();

        if(!response.detail) {
            setPermissionData(response.data.permissions);
        }
    }

    const handleAdd = async () => {
        const name = nameInput;
        const permissions = selectedPermissions.join(",");

        if(!name) {
            setInfoMessage("Preencha todos os campos");
            return;
        }

        setRequestLoading(true);
        const response = await addGroup({name, permissions});
        setRequestLoading(false);

        if(response.detail) {
            setInfoMessage(response.detail);
        }else{
            navigate("/groups")
        }

    }

    useEffect(() => {
        Promise.resolve(handleGetPermissions()).finally(() => {
            setRequestLoading(false);
        })

    }, [])

    return (
        <PermissionMiddleWares codeName="add_group">
            <Helmet>
                <title>Adicionar um Grupo</title>
            </Helmet>
            {requestLoading && <LinearProgress sx={{height: 2}} color="primary"/>}

            <PageTitleWrapper>
                <PageTitle
                    heading="Adicionar um Grupo"
                    subHeading="Adicione um cargo e defina Nome, Permissões e etc..."
                />
            </PageTitleWrapper>

                
            <Snackbar
                open={infoMessage != ""}
                onClose={() => setInfoMessage("")}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                message={infoMessage}
            />

            <Container maxWidth="xl">
                <Stack sx={{padding: 2, gap: 3, marginLeft: 18, width: 800}}>
                    <TextField
                        fullWidth
                        label="Nome *"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}

                    />

                    <PermissionList
                        permissionsData={permissionsData}
                        selectedPermissions={selectedPermissions}
                        setSelectedPermissions={setSeletedPermissions}
                    />

                    <Button variant="outlined"
                        sx={{ width: 90, mt: 3.4, marginBottom: 5 }}                        
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

export default AddGroup