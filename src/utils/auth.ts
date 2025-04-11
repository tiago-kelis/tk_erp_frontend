import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useRequest } from "./request";
import { setUser, setUserEnterprise } from "./redux/reducers/authReducer";

const LOCAL_STORAGE_KEY = "AUTH_ACCESS";

// Função para obter o token de acesso do LocalStorage
export const handleGetAccessToken = () => localStorage.getItem(LOCAL_STORAGE_KEY) ?? "";

export const userAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const { signIn, getUser } = useRequest();

    const user = {
        user: auth.user,
        enterprise: auth.enterprise,
    };

    // Função para inicializar o usuário
    const handleInitUser = async () => {
        const access_token = handleGetAccessToken();
        if (!access_token) return;

        try {
            const response = await getUser();
            if (!response.detail) {
                dispatch(setUser(response.data.user));
                dispatch(setUserEnterprise(response.data.enterprise));
            }
        } catch (error) {
            console.error("Erro ao inicializar usuário:", error);
        }
    };

    // Função para verificar permissões
    const handlePermissionExists = (permissionCodename: string) => {
        if (auth.enterprise?.is_owner) return true;
        return auth.enterprise?.permissions?.some(p => p.codename === permissionCodename) ?? false;
    };

    // Função para realizar o login
    const handleSignIn = async (email: string, password: string) => {
        try {
            const response = await signIn({ email, password });
            if (!response.detail) {
                dispatch(setUser(response.data.user));
                dispatch(setUserEnterprise(response.data.enterprise));

                // Salvar token de acesso no local storage
                localStorage.setItem(LOCAL_STORAGE_KEY, response.data.access);
            }
            return response;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return { detail: "Erro ao autenticar. Verifique suas credenciais." };
        }
    };

    // Função para realizar o logout
    const handleSignOut = () => {
        dispatch(setUser(null));
        dispatch(setUserEnterprise(null));
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    return {
        user,
        isLogged: auth.user !== null,
        handleInitUser,
        handlePermissionExists,
        handleSignIn,
        handleSignOut,
    };
};