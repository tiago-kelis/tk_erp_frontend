import { Card, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { GroupDetail } from "src/models/group"
import { userAuth } from "src/utils/auth";
import { useRequest } from "src/utils/request";


type Props = {
    groupList: GroupDetail[];
    refreshList: () => void
}

const GroupTable = ({groupList, refreshList}: Props) => {

    const { handlePermissionExists} = userAuth();
    const {deleteGroup} = useRequest();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleEditGroup = (id: number) => {
        navigate(`/groups/edit/${id}`)
    }

    const handleDeleteGroup = async (id: number) => {

        await deleteGroup(id) 
        refreshList();       
    }

    return (
        <Container maxWidth="lg">
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groupList.map((group) => (
                                <TableRow hover key={group.id}>

                                    <TableCell>
                                        <Typography fontWeight="bold" gutterBottom>
                                            #{group.id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight="bold" gutterBottom>
                                            #{group.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">

                                        {handlePermissionExists("change_group") && 
                                            <Tooltip title="Edite o Cargo" arrow>
                                                <IconButton
                                                    sx={{
                                                        "&:hover": {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.primary.main
                                                    }}

                                                    color="inherit"
                                                    size="small"
                                                >
                                                    <EditTwoToneIcon onClick={() => handleEditGroup(group.id)}/>
                                                </IconButton>
                                            </Tooltip>
                                        }

                                        {handlePermissionExists("delete_Group") &&
                                            <Tooltip title="Excluir Cargo" arrow>
                                            <IconButton 
                                                sx={{
                                                    "&:hover": {
                                                        background: theme.colors.primary.lighter
                                                    },
                                                    color: theme.palette.error.main
                                                }}

                                                color="inherit"
                                                size="small"
                                            >
                                                <DeleteTwoToneIcon onClick={() => handleDeleteGroup(group.id)}/>
                                            </IconButton>
                                            </Tooltip>
                                        }

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    )
}

export default GroupTable;