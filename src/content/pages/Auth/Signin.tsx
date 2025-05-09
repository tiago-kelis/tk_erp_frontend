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

            <MainContent>
                <Container maxWidth="sm">
                    <Card sx={{textAlign: "center", mt: 3, p: 4}}>
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

                            <Button onClick={handleSignInBtn} variant="outlined" style={{marginTop: 40}}>
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