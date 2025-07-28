import {
  Button,
  Dialog,
  Notification,
  VerticalLayout
} from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import { DirectorService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';
import Director from 'Frontend/generated/com/unl/proyectogrupal/base/models/Director';

export function EliminarDirector({
  director,
  onCancel,
  onDeleted,
}: {
  director: Director;
  onCancel: () => void;
  onDeleted: () => void;
}) {
  const loading = useSignal(false);

  const confirmar = async () => {
    loading.value = true;
    try {
      await DirectorService.delete(director.idDirector);
      Notification.show('Director eliminado correctamente', { theme: 'success' });
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
        <h4>¿Estás seguro que deseas eliminar a {director.nombre}?</h4>
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
