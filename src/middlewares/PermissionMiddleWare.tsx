import { Box, Button, Container, Typography } from "@mui/material"
import { ReactNode } from "react"
import { useNavigate } from "react-router"
import { userAuth } from "src/utils/auth"

type Props = {
    children: ReactNode
    codeName: string
}

export const PermissionMiddleWares = ({children, codeName}: Props) => {

    const navigate = useNavigate();

    const handleRefreshPage = () => {
        navigate(0)
    }

    const { handlePermissionExists} = userAuth()

    if(!handlePermissionExists(codeName)) {

        return (
            <Container maxWidth="sm" sx={{mt: 16}}>
                <Box textAlign={"center"}>
                    <img
                        alt="status-500"
                        height={250}
                        src="/static/images/status/500.svg"
                    />
                    <Typography variant="h2" sx={{my: 2}}>
                        Você não tem permissão para acessar essa Área
                    </Typography>

                    <Typography color="text.segundary" sx={{mb: 4}}>
                        SE você solicitou para a administaração, a permissão  para acessar essa Área, atualize a página!
                    </Typography>

                    <Button onClick={handleRefreshPage} variant="contained" sx={{ml: 1}}>
                        Atualize a Página
                    </Button>

                </Box>                
                
            </Container>
        )
    }

    return (
        <>
         {children}
        </>
    )

}