import {
    Button,
    Dialog,
    NumberField,
    PasswordField,
    TextField,
    VerticalLayout,
    Notification
} from '@vaadin/react-components';
import { PersonaService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import Persona from 'Frontend/generated/com/unl/proyectogrupal/base/models/Persona';
import {useEffect} from "react";

export function EditarUsuario({
                                  persona,
                                  onCancel,
                                  onUpdated,
                              }: {
    persona: Persona;
    onCancel: () => void;
    onUpdated: () => void;
}) {
    const usuario = useSignal(persona.usuario);
    const edad = useSignal(persona.edad?.toString() || '');
    const telefono = useSignal(persona.telefono || '');

    const guardar = async () => {
        try {
            if (
                usuario.value.trim() &&
                edad.value.trim() &&
                telefono.value.trim()
            ) {
                await PersonaService.update(
                    persona.id,
                    usuario.value,
                    telefono.value,
                    parseInt(edad.value)
                );


                Notification.show('Usuario actualizado correctamente', {
                    duration: 5000,
                    position: 'bottom-end',
                    theme: 'success',
                });

                onUpdated(); // Notifica a la lista o vista principal
            } else {
                Notification.show('No se pudo actualizar, faltan datos', {
                    duration: 5000,
                    position: 'top-center',
                    theme: 'error',
                });
            }
        } catch (error) {
            console.error(error);
            handleError(error);
        }
    };

    return (
        <Dialog opened onOpenedChanged={(e) => !e.detail.value && onCancel()}>
            <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
                <h4>Editar Usuario</h4>

                <TextField label="Nombre del usuario" value={usuario.value} onValueChanged={(e) => (usuario.value = e.detail.value)} />
                <NumberField label="Edad" value={parseInt(edad.value)} onValueChanged={(e) => (edad.value = String(e.detail.value))} />
                <TextField label="Teléfono" value={telefono.value} onValueChanged={(e) => (telefono.value = e.detail.value)} />

                <Button theme="primary" onClick={guardar}>Guardar</Button>
                <Button onClick={onCancel}>Cancelar</Button>
            </VerticalLayout>
        </Dialog>
    );
}
