import {configureAuth} from "@vaadin/hilla-react-auth";
import {CuentaService} from "Frontend/generated/endpoints";

// MAPEA LOS ROLES
const auth = configureAuth(CuentaService.getAuthentication, {
    getRoles: (user) => user.authorities?.map((v) => v.authority.replace("ROLE_", "")) ?? []
});

//SE UTILIZARAPARA LAS VISTA
export const  useAuth = auth.useAuth;
//VERIFICA SI ESTA EN SESION
export const isLogin = CuentaService.isLogin;
export const AuthProvider = auth.AuthProvider;
