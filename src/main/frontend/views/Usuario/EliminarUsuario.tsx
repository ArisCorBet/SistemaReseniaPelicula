import {
  Button,
  Dialog,
  Notification,
  VerticalLayout
} from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import { PersonaService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';
import Persona from 'Frontend/generated/com/unl/proyectogrupal/base/models/Persona';

export function EliminarUsuario({
  persona,
  onCancel,
  onDeleted,
}: {
  persona: Persona;
  onCancel: () => void;
  onDeleted: () => void;
}) {
  const loading = useSignal(false);

  const confirmar = async () => {
    loading.value = true;
    try {
      await PersonaService.delete(persona.id);
      Notification.show('Usuario eliminado correctamente', { theme: 'success' });
      onDeleted();
    } catch (err) {
      handleError(err);
    } finally {
      loading.value = false;
    }
  };

  return (
    <Dialog opened onOpenedChanged={(e) => !e.detail.value && onCancel()}>
      <VerticalLayout style={{ padding: '1rem' }}>
        <h4>¿Estás seguro que deseas eliminar a {persona.nombre}?</h4>
        <Button theme="error" onClick={confirmar} disabled={loading.value}>
          Eliminar
        </Button>
        <Button onClick={onCancel} disabled={loading.value}>
          Cancelar
        </Button>
      </VerticalLayout>
    </Dialog>
  );
}
