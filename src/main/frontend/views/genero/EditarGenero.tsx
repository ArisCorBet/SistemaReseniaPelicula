import {
  Button,
  Dialog,
  Notification,
  TextField,
  VerticalLayout,
  NumberField,
} from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import Genero from 'Frontend/generated/com/unl/proyectogrupal/base/models/Genero';
import { GeneroService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';

export function EditarGenero({
  genero,
  onCancel,
  onUpdated,
}: {
  genero: Genero;
  onCancel: () => void;
  onUpdated: () => void;
}) {
  const nombre = useSignal(genero.nombre);

  const guardar = async () => {
    try {
      await GeneroService.updateGenero(genero.idGenero, nombre.value);
      Notification.show('Genero actualizado correctamente', { theme: 'success' });
      onUpdated();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog opened onOpenedChanged={(e) => !e.detail.value && onCancel()}>
      <VerticalLayout style={{ padding: '1rem' }}>
        <h4>Editar Actor</h4>
        <TextField label="Nombre" value={nombre.value} onChange={(e) => (nombre.value = e.target.value)} />
        <Button theme="primary" onClick={guardar}>
          Guardar
        </Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </VerticalLayout>
    </Dialog>
  );
}
