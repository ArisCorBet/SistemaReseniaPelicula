import { Button, Dialog, NumberField, PasswordField, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';
import { PersonaService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';

type UsuarioCreateProps = {
    dialogOpened: boolean;
    onDialogClosed: () => boolean;
    onUsuarioCreated: () => void;
};

export function CrearUSuario({onUsuarioCreado} :{onUsuarioCreado : () => void} ) {
    const dialogOpened = useSignal(false);
    const usuario = useSignal('');
    const edad = useSignal('');
    const telefono = useSignal('');
    const correo = useSignal('');
    const contrasenia = useSignal('');

    const createUsuario = async () => {
        try {
            if (usuario.value.trim().length > 0 && edad.value.trim().length > 0 &&
                telefono.value.trim().length > 0 && correo.value.trim().length > 0 &&
                contrasenia.value.trim().length > 0) {

                await PersonaService.save(usuario.value,correo.value,contrasenia.value,telefono.value,Number(edad.value));

                // Limpiar campos
                dialogOpened.value = false;
                usuario.value = '';
                edad.value = '';
                telefono.value = '';
                correo.value = '';
                contrasenia.value = '';
                onUsuarioCreado();
                Notification.show('Persona creada', {theme: 'success'});
            } else {
                Notification.show('No se pudo crear, faltan datos', {
                    duration: 5000,
                    position: 'top-center',
                    theme: 'error'
                });
            }
        } catch (error) {
            console.error(error);
            handleError(error);
        }
    };

    return (
        <>
            <Button theme = "primary" onClick={() => dialogOpened.value = true}>
                Agregar Usuario
            </Button>

            <Dialog
                modeless
                headerTitle="Nueva Cuenta"
                opened={dialogOpened.value}
                onOpenedChanged={({ detail }) => (
                    dialogOpened.value = detail.value
                    )}
            >
                <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
                    <TextField
                        label="Nombre del usuario"
                        placeholder="Ingrese el usuario"
                        value={usuario.value}
                        onValueChanged={(e) => (usuario.value = e.detail.value)}
                    />
                    <NumberField
                        label="Edad"
                        placeholder="Escriba su edad"
                        value={edad.value}
                        onValueChanged={(e) => (edad.value = e.detail.value)}
                    />
                    <TextField
                        label="Teléfono"
                        placeholder="Ingrese su teléfono"
                        value={telefono.value}
                        onValueChanged={(e) => (telefono.value = e.detail.value)}
                    />
                    <TextField
                        label="Correo del usuario"
                        placeholder="Ingrese el correo"
                        value={correo.value}
                        onValueChanged={(e) => (correo.value = e.detail.value)}
                    />
                    <PasswordField
                        label="Clave del usuario"
                        placeholder="Ingrese la clave"
                        value={contrasenia.value}
                        onValueChanged={(e) => (contrasenia.value = e.detail.value)}
                    />

                    <Button theme="primary" onClick={createUsuario}>
                        Guardar
                    </Button>
                </VerticalLayout>
            </Dialog>
        </>
    );
}