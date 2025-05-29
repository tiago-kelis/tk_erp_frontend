import { Box, Button, Card, Container, Snackbar, Stack, TextField } from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";
import { Helmet } from "react-helmet-async"

import MuiAlert from "@mui/material/Alert"
import { userAuth } from "src/utils/auth";
import { useNavigate } from "react-router";

const MainContent = styled(Box)(() => ({
    height: '100%',
    display: 'flex',
    flex: 1,
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));



const SignIn = () => {

    const navigate = useNavigate();
    
    const [snackBarMessage, setSnackBarMessage] = useState("")
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("")

    const {handleSignIn} = userAuth();

    const handleSignInBtn = async () => {

        if(emailInput === "" || passwordInput === "") {
            setSnackBarMessage("Preencha todos os campos");
            return;
        }

       
        const requestSignIn = await handleSignIn(emailInput, passwordInput);

        if (requestSignIn.detail) {
           setSnackBarMessage("Email e/ou senha(s) incorretos(s).")
           return;
        }

        // Redirection on success
        navigate("/");

    }

    return (
        <>
            <Helmet>
                <title>
                    Login
                </title>
            </Helmet>

            <Snackbar open={snackBarMessage != ""}
                autoHideDuration={6000}
                onClose={() => setSnackBarMessage("")}
            >
                <MuiAlert style={{color: "whitesmoke"}} severity="error">{snackBarMessage}</MuiAlert>

            </Snackbar>

            <MainContent sx={{
                    backgroundImage: "url('background.jpg'), linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
                    backgroundBlendMode: "overlay",
                    backgroundColor: "transparent",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
            }}>
                <Container
                    maxWidth="sm"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        
                    }}
                    >
                    <Box component="img" src="Perfil_Login.png" alt="Minha imagem" width={100} height={100} />

                    <Card sx={{ textAlign: "center", mt: 2, p: 3, maxWidth: 400, width: "100%", backgroundColor: "rgba(88, 22, 108, 0.3)" }}>
                        <Stack spacing={3}>
                        <TextField
                            label="Digite seu email"
                            type="email"
                            value={emailInput}
                            onChange={e => setEmailInput(e.target.value)}
                        />

                        <TextField
                            label="Digite sua senha"
                            type="password"
                            value={passwordInput}
                            onChange={e => setPasswordInput(e.target.value)}
                        />

                        <Button onClick={handleSignInBtn} variant="outlined" sx={{ mt: 5 }}>
                            Entrar
                        </Button>
                        </Stack>
                    </Card>
                </Container>
            </MainContent>
        </>
    )
}

export default SignIn;