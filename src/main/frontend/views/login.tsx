
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { data, redirect, useNavigate, useSearchParams } from 'react-router';
import { CuentaService } from 'Frontend/generated/endpoints';
import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useAuth, AuthProvider, isLogin } from 'Frontend/security/auth';
import { LoginForm, LoginOverlay, Notification } from '@vaadin/react-components';


export const config: ViewConfig = {
    skipLayouts: true,
    menu: {
        exclude: true
    }
}

export default function LoginView() {
    console.log("LOGIN");
    const navigate = useNavigate();
    useEffect(() => {

        isLogin().then(data => {

                if(data == true)
                    navigate('/');
                console.log(data+ " -- ");

            }

        );

    }, []);
    const { state, login } = useAuth();
    const [searchParams] = useSearchParams();
    const hasError = useSignal(false);
    const errores = searchParams.has('error');
    const i18n = {
        header: {
            title: 'FOROX',
            description: 'Forox plataforma para solventar tus dudad académicas',
            logo: 'https://forox.vercel.app/logo.png',
        },
        form: {
            title: 'Iniciar sesión',
            username: 'Correo electrónico',
            password: 'Contraseña',
            submit: 'Iniciar sesión',
            forgotPassword: '¿Olvidaste tu contraseña?',
        },
        errorMessage: {
            title: 'Error de inicio de sesión',
            message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
            username: 'Usuario incorrecto',
            password: 'Contraseña incorrecta',
        },
        additionalInformation: 'Si puedes imaginarlo, puedes programarlo.',
    };

    useEffect(() => {
        CuentaService.CreateRoles().then(data =>
            hasError.value = false
        );
    }, []);


    return (
        <main className="flex justify-center items-center w-full h-full">
            <LoginOverlay opened i18n = {i18n} error={errores} noForgotPassword
                          onErrorChanged={(event) => {
                              console.log(event);
                              hasError.value = event.detail.value;
                          }}

                          onLogin={
                              async ({ detail: { username, password } }) => {

                                  CuentaService.login(username, password).then(async function (data) {

                                      console.log(data);
                                      if (data?.estado == 'false') {

                                          Notification.show(data?.message, { duration: 5000, position: 'top-center', theme: 'error' });

                                          hasError.value = Boolean("true");
                                          navigate('/login?error');
                                      } else {
                                          const { error } = await login(username, password);
                                          hasError.value = Boolean(error);
                                          const dato = await CuentaService.isLogin();
                                          console.log(dato);

                                          Notification.show('Bienvenido', { duration: 5000, position: 'top-center', theme: 'success' });

                                          window.location.reload();
                                          navigate("/", { replace: true });
                                      }
                                  });
                              }}
            />
        </main>
    );
}